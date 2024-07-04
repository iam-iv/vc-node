import { User } from "../models/user";

export interface UserSignUpRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface UserSignUpResponsetDto {
  id: number;
}

export interface UserLoginRequestDto {
  email: string;
  password: string;
}
