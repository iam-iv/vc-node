import { User } from "./user";
import { EventRole } from "./eventRole";

export interface Volunteer extends User {
  isVolunteerActive: boolean;
  isOnVac: boolean;
  notActiveSince?: Date;
  eventRoles?: EventRole[];
  volunteeringInServices?: Services[];
}
