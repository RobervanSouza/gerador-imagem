import { Clerk } from "@clerk/backend";

export const server = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});