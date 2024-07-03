import { Volunteer } from "./volunteer";
import { Team } from "./team";

interface TeamLeader extends Volunteer {
  leadingSince: Date;
  ledUntil: Date;
  leadingTeams: Team[];
}
