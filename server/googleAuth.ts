import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import memorystore from "memorystore";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

// Required environment variables:
// - DATABASE_URL: Postgres connection string (used by connect-pg-simple)
// - SESSION_SECRET: Session cookie encryption secret
// - GOOGLE_CLIENT_ID
// - GOOGLE_CLIENT_SECRET
// - GOOGLE_CALLBACK_URL (e.g., https://your-domain.com/api/callback)

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set for Google Auth session store");
}
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set for Google Auth sessions");
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
}
if (!process.env.GOOGLE_CALLBACK_URL) {
  throw new Error("GOOGLE_CALLBACK_URL must be set (e.g., https://domain/api/callback)");
}

async function getGoogleOidcConfig() {
  // Google issuer discovery with client_id and client_secret
  return await client.discovery(
    new URL("https://accounts.google.com"),
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
  );
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  // Use in-memory session store in development to avoid DB connectivity blockers
  if (process.env.USE_MEMORY_SESSION === "1" || process.env.NODE_ENV !== "production") {
    const MemoryStore = memorystore(session);
    const memoryStore = new MemoryStore({ checkPeriod: sessionTtl });
    return session({
      secret: process.env.SESSION_SECRET!,
      store: memoryStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: sessionTtl,
      },
    });
  }

  const PgStore = connectPg(session);
  const sessionStore = new PgStore({
    // Ensure SSL when connecting to Render Postgres
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
) {
  // Persist useful token/session info for refresh or expiry checks
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  // Prefer claim expiry if present, fallback to token helper value
  user.expires_at = user.claims?.exp ?? tokens.expires_at;
}

async function upsertUserFromClaims(claims: any) {
  // Map Google OIDC standard claims to our user table shape
  const upserted = await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["given_name"],
    lastName: claims["family_name"],
    profileImageUrl: claims["picture"],
  });
  return upserted;
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getGoogleOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback,
  ) => {
    const user: any = {};
    updateUserSession(user, tokens);
    await upsertUserFromClaims(tokens.claims());
    verified(null, user);
  };

  const strategy = new Strategy(
    {
      name: "google",
      config,
      scope: "openid email profile",
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      // Provide confidential client credentials for token exchange
      client: {
        token_endpoint_auth_method: "client_secret_post",
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    } as any,
    verify,
  );
  passport.use(strategy);

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req, res, next) => {
    // Cast to any to allow non-typed Google params like access_type
    const options: any = {
      prompt: "consent",
      scope: ["openid", "email", "profile"],
      access_type: "offline",
    };
    passport.authenticate("google", options)(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    passport.authenticate("google", (err: any, user: Express.User | false | null, info: unknown) => {
      if (err) {
        console.error("Google OAuth callback error:", err, info);
        return res.status(500).json({ message: err.message || "OAuth error", info });
      }
      if (!user) {
        console.error("Google OAuth: no user returned", info);
        return res.redirect("/api/login");
      }
      req.logIn(user as Express.User, (loginErr: any) => {
        if (loginErr) {
          console.error("Google OAuth login error:", loginErr);
          return res.status(500).json({ message: loginErr.message || "Login error" });
        }
        return res.redirect("/");
      });
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      // No Google end-session endpoint; just clear local session and redirect home
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const user = req.user as any;
  if (!req.isAuthenticated() || !user?.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }
  // No refresh flow implemented here to keep it simple; require re-login
  return res.status(401).json({ message: "Unauthorized" });
};


