import { relations } from "drizzle-orm/relations";
import { user, volunteer, team, team_leader, calendar_event, team_event, service } from "./schema";

export const volunteerRelations = relations(volunteer, ({one, many}) => ({
	user: one(user, {
		fields: [volunteer.id],
		references: [user.id]
	}),
	team_leaders: many(team_leader),
	services: many(service),
}));

export const userRelations = relations(user, ({many}) => ({
	volunteers: many(volunteer),
	calendar_events: many(calendar_event),
}));

export const team_leaderRelations = relations(team_leader, ({one}) => ({
	team: one(team, {
		fields: [team_leader.team_id],
		references: [team.id]
	}),
	volunteer: one(volunteer, {
		fields: [team_leader.team_leader_id],
		references: [volunteer.id]
	}),
}));

export const teamRelations = relations(team, ({many}) => ({
	team_leaders: many(team_leader),
	team_events: many(team_event),
}));

export const team_eventRelations = relations(team_event, ({one}) => ({
	calendar_event: one(calendar_event, {
		fields: [team_event.event_id],
		references: [calendar_event.id]
	}),
	team: one(team, {
		fields: [team_event.team_id],
		references: [team.id]
	}),
}));

export const calendar_eventRelations = relations(calendar_event, ({one, many}) => ({
	team_events: many(team_event),
	user: one(user, {
		fields: [calendar_event.created_by],
		references: [user.id]
	}),
	services: many(service),
}));

export const serviceRelations = relations(service, ({one}) => ({
	calendar_event: one(calendar_event, {
		fields: [service.id],
		references: [calendar_event.id]
	}),
	volunteer: one(volunteer, {
		fields: [service.preacherId],
		references: [volunteer.id]
	}),
}));