import { EVENT_TYPE } from "../enums";
import { User } from "./user";

export interface CalendarEvent {
  id: number;
  title: string;
  notes: ?string;
  dateStart?: Date;
  dateEnd?: Date;
  eventType: EVENT_TYPE;
  organizer: User;
}
