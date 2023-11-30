import { Clerk } from "@clerk/backend";

export const server = Clerk({
  apiKey: process.env.CLERK_SECRET_KEY,
});