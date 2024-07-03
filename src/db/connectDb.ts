import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "../../drizzle/schema";

const connectionString = process.env.CONN_STRING ?? "";
const client = postgres(connectionString);
const db = drizzle(client);
const allUsers = await db.select().from(user);

export { db, allUsers };
