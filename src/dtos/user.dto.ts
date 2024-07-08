import { User } from "../models/user";

export interface UserSignUpRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserLoginRequestDto {
  email: string;
  password: string;
}

export interface UserLoginResponseDto extends Omit<User, "birthday" | "email"> {
  birthday?: string | null;
}
