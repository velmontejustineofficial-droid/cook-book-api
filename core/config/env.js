import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "LOADED" : "NOT LOADED");

export const env = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
};