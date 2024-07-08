import { pgTable, foreignKey, pgEnum, uuid, date, boolean, timestamp, bigint, text, primaryKey, unique } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const EVENT_ROLE = pgEnum("EVENT_ROLE", ['ORGANIZER', 'TRANSITION', 'PREACHER', 'PROTOCOL', 'SERVICE_PRAYER', 'HAPPYLAND'])
export const EVENT_TYPE = pgEnum("EVENT_TYPE", ['SERVICE', 'LET_IT_SMILE', 'CONNECT_GROUP'])
export const SERVICE_TYPE = pgEnum("SERVICE_TYPE", ['SUNDAY_SERVICE', 'SPECIAL_SERVICE', 'SCHOOLTURA', 'COMUNA13'])
export const SYSTEM_ROLE = pgEnum("SYSTEM_ROLE", ['GUEST', 'VOLUNTEER', 'TEAM_LEAD', 'PASTOR', 'ADMIN'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const volunteer = pgTable("volunteer", {
	id: uuid("id").primaryKey().notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	active_since: date("active_since").defaultNow(),
	not_active_since: date("not_active_since"),
	is_on_vac: boolean("is_on_vac").default(false),
	is_volunteer_active: boolean("is_volunteer_active").default(true),
});

export const team_leader = pgTable("team_leader", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	team_id: uuid("team_id").references(() => team.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	team_leader_id: uuid("team_leader_id").references(() => volunteer.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	leading_since: date("leading_since"),
	led_until: date("led_until"),
});

export const team_event = pgTable("team_event", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	team_id: uuid("team_id").references(() => team.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	event_id: uuid("event_id").references(() => calendar_event.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const calendar_event = pgTable("calendar_event", {
	id: uuid("id").default(sql`auth.uid()`).primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	start_date: timestamp("start_date", { withTimezone: true, mode: 'string' }),
	end_date: timestamp("end_date", { withTimezone: true, mode: 'string' }),
	title: text("title").notNull(),
	event_type: EVENT_TYPE("event_type").notNull(),
	notes: text("notes"),
	created_by: uuid("created_by").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const team = pgTable("team", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("name"),
});

export const service = pgTable("service", {
	id: uuid("id").primaryKey().notNull().references(() => calendar_event.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	preacher_name: text("preacher_name"),
	is_preacher_guest: boolean("is_preacher_guest").default(false),
	service_type: SERVICE_TYPE("service_type"),
	preacherId: uuid("preacherId").references(() => volunteer.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const user = pgTable("user", {
	id: uuid("id").defaultRandom().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	phone_number: text("phone_number"),
	email: text("email").notNull(),
	birthday: date("birthday"),
	is_user_active: boolean("is_user_active").default(true).notNull(),
	passwordHash: text("passwordHash").notNull(),
	system_role: SYSTEM_ROLE("system_role").default('GUEST').notNull(),
},
(table) => {
	return {
		user_pkey: primaryKey({ columns: [table.id, table.email], name: "user_pkey"}),
		user_id_key: unique("user_id_key").on(table.id),
		user_email_key: unique("user_email_key").on(table.email),
	}
});