import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Waitlist routes
  app.get('/api/waitlist/count', async (req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      console.error("Error fetching waitlist count:", error);
      res.status(500).json({ message: "Failed to fetch waitlist count" });
    }
  });

  app.post('/api/waitlist/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse({
        userId,
        note: req.body.note || null,
      });

      // Join waitlist (this handles duplicates automatically)
      const entry = await storage.joinWaitlist(validatedData);
      
      res.json({ 
        success: true, 
        entry,
        message: "Successfully joined the waitlist!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data", 
          errors: error.errors 
        });
      }
      console.error("Error joining waitlist:", error);
      res.status(500).json({ message: "Failed to join waitlist" });
    }
  });

  app.get('/api/waitlist/status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const hasJoined = await storage.hasUserJoinedWaitlist(userId);
      const entry = hasJoined ? await storage.getUserWaitlistEntry(userId) : null;
      
      res.json({ 
        hasJoined, 
        entry 
      });
    } catch (error) {
      console.error("Error checking waitlist status:", error);
      res.status(500).json({ message: "Failed to check waitlist status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
