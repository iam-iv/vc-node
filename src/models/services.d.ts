import { CalendarEvent } from "./calendarEvent";
import { Team } from "./team";
import { Volunteer } from "./volunteer";
import { SERVICE_TYPE } from "../enums";

export interface Services extends CalendarEvent {
  preacherName?: string;
  isPreacherGuest?: boolean;
  preacherId?: number;
  serviceType: SERVICE_TYPE;
  participatingTeams: Team[];
  volunteers: Volunteer[];
}
