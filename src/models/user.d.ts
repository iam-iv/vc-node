import { SYSTEM_ROLE } from "../enums";

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  isUserActive: boolean;
  passwordHash: string;
  roles: SYSTEM_ROLE[];
}
