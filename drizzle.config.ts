import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://postgres.kzieqjzymzbfuifuzifa:451997159043Sb!@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
  },
});
