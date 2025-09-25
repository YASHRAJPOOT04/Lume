import {
  users,
  waitlistEntries,
  type User,
  type UpsertUser,
  type WaitlistEntry,
  type InsertWaitlistEntry,
} from "@shared/schema";
import { db } from "./db";
import { eq, count } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Waitlist operations
  joinWaitlist(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistCount(): Promise<number>;
  hasUserJoinedWaitlist(userId: string): Promise<boolean>;
  getUserWaitlistEntry(userId: string): Promise<WaitlistEntry | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Waitlist operations
  async joinWaitlist(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    // Check if user already joined to prevent duplicates
    const existing = await this.getUserWaitlistEntry(entry.userId);
    if (existing) {
      return existing;
    }

    const [waitlistEntry] = await db
      .insert(waitlistEntries)
      .values(entry)
      .returning();
    return waitlistEntry;
  }

  async getWaitlistCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(waitlistEntries);
    return result.count;
  }

  async hasUserJoinedWaitlist(userId: string): Promise<boolean> {
    const entry = await this.getUserWaitlistEntry(userId);
    return !!entry;
  }

  async getUserWaitlistEntry(userId: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.userId, userId));
    return entry;
  }
}

export const storage = new DatabaseStorage();
