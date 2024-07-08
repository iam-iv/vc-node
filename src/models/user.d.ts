import { SYSTEM_ROLE } from "../enums";

export interface User {
  id?: string;
  email: string;
  phoneNumber?: string | null;
  firstName: string;
  lastName: string;
  birthday?: Date | null;
  isUserActive?: boolean;
  passwordHash: string;
  roles: keyof typeof SYSTEM_ROLE;
}
