import {
  pgTable,
  foreignKey,
  pgEnum,
  bigint,
  timestamp,
  date,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const aal_level = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const code_challenge_method = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factor_status = pgEnum("factor_status", [
  "unverified",
  "verified",
]);
export const factor_type = pgEnum("factor_type", ["totp", "webauthn"]);
export const one_time_token_type = pgEnum("one_time_token_type", [
  "confirmation_token",
  "reauthentication_token",
  "recovery_token",
  "email_change_token_new",
  "email_change_token_current",
  "phone_change_token",
]);
export const key_status = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const key_type = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const EVENT_ROLE = pgEnum("EVENT_ROLE", [
  "ORGANIZER",
  "TRANSITION",
  "PREACHER",
  "PROTOCOL",
  "SERVICE_PRAYER",
  "HAPPYLAND",
]);
export const EVENT_TYPE = pgEnum("EVENT_TYPE", ["SERVICE", "LET_IT_SMILE"]);
export const SERVICE_TYPE = pgEnum("SERVICE_TYPE", [
  "SUNDAY_SERVICE",
  "SPECIAL_SERVICE",
  "SCHOOLTURA",
  "COMUNA13",
]);
export const SYSTEM_ROLE = pgEnum("SYSTEM_ROLE", [
  "GUEST",
  "VOLUNTEER",
  "TEAM_LEAD",
  "PASTOR",
  "ADMIN",
]);
export const action = pgEnum("action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "TRUNCATE",
  "ERROR",
]);
export const equality_op = pgEnum("equality_op", [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "in",
]);

export const team_leader = pgTable("team_leader", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  userId: bigint("userId", { mode: "number" }).references(() => user.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  teamId: bigint("teamId", { mode: "number" }).references(() => team.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  leading_since: date("leading_since"),
  led_until: date("led_until"),
});

export const calendar_event = pgTable("calendar_event", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  title: text("title"),
  notes: text("notes"),
  date_start: timestamp("date_start", { withTimezone: true, mode: "string" }),
  date_end: timestamp("date_end", { withTimezone: true, mode: "string" }),
  event_type: EVENT_TYPE("event_type"),
});

export const team_service = pgTable("team_service", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  teamId: bigint("teamId", { mode: "number" })
    .notNull()
    .references(() => team.id, { onDelete: "restrict", onUpdate: "cascade" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  serviceId: bigint("serviceId", { mode: "number" }).references(
    () => service.id,
    { onDelete: "restrict", onUpdate: "cascade" },
  ),
});

export const service_volunteer = pgTable("service_volunteer", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  volunteerId: bigint("volunteerId", { mode: "number" }).references(
    () => volunteer.id,
    { onDelete: "restrict", onUpdate: "cascade" },
  ),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  serviceId: bigint("serviceId", { mode: "number" }).references(
    () => service.id,
    { onDelete: "restrict", onUpdate: "cascade" },
  ),
  service_role: EVENT_ROLE("service_role"),
});

export const user = pgTable("user", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  phone_number: text("phone_number"),
  email: text("email").notNull(),
  birthday: date("birthday"),
  is_user_active: boolean("is_user_active").default(true).notNull(),
  passwordHash: text("passwordHash").default("").notNull(),
  // TODO: failed to parse database type 'SYSTEM_ROLE"[]'
  system_role: SYSTEM_ROLE("system_role").array(),
});

export const service = pgTable("service", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .notNull()
    .references(() => calendar_event.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  preacher_name: text("preacher_name"),
  is_preacher_guest: boolean("is_preacher_guest"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  preacherId: bigint("preacherId", { mode: "number" }).references(
    () => user.id,
    { onDelete: "cascade", onUpdate: "cascade" },
  ),
  service_type: SERVICE_TYPE("service_type"),
});

export const volunteer = pgTable("volunteer", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  is_volunteer_active: boolean("is_volunteer_active").default(false),
  is_on_vac: boolean("is_on_vac").default(false),
  not_active_since: date("not_active_since"),
});

export const team = pgTable("team", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name"),
});
