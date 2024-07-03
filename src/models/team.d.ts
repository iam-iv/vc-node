import { Volunteer } from "./volunteer";
import { TeamLeader } from "./teamLeader";
import { Services } from "./services";

export interface Team {
  id: number;
  name: string;
  volunteers?: Volunteer[];
  teamLeader?: TeamLeader;
  participatingInServices?: Services[];
}
