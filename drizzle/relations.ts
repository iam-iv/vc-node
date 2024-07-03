import { relations } from "drizzle-orm/relations";
import { team, team_leader, user, service, team_service, service_volunteer, volunteer, calendar_event } from "./schema";

export const team_leaderRelations = relations(team_leader, ({one}) => ({
	team: one(team, {
		fields: [team_leader.teamId],
		references: [team.id]
	}),
	user: one(user, {
		fields: [team_leader.userId],
		references: [user.id]
	}),
}));

export const teamRelations = relations(team, ({many}) => ({
	team_leaders: many(team_leader),
	team_services: many(team_service),
}));

export const userRelations = relations(user, ({many}) => ({
	team_leaders: many(team_leader),
	services: many(service),
	volunteers: many(volunteer),
}));

export const team_serviceRelations = relations(team_service, ({one}) => ({
	service: one(service, {
		fields: [team_service.serviceId],
		references: [service.id]
	}),
	team: one(team, {
		fields: [team_service.teamId],
		references: [team.id]
	}),
}));

export const serviceRelations = relations(service, ({one, many}) => ({
	team_services: many(team_service),
	service_volunteers: many(service_volunteer),
	calendar_event: one(calendar_event, {
		fields: [service.id],
		references: [calendar_event.id]
	}),
	user: one(user, {
		fields: [service.preacherId],
		references: [user.id]
	}),
}));

export const service_volunteerRelations = relations(service_volunteer, ({one}) => ({
	service: one(service, {
		fields: [service_volunteer.serviceId],
		references: [service.id]
	}),
	volunteer: one(volunteer, {
		fields: [service_volunteer.volunteerId],
		references: [volunteer.id]
	}),
}));

export const volunteerRelations = relations(volunteer, ({one, many}) => ({
	service_volunteers: many(service_volunteer),
	user: one(user, {
		fields: [volunteer.id],
		references: [user.id]
	}),
}));

export const calendar_eventRelations = relations(calendar_event, ({many}) => ({
	services: many(service),
}));