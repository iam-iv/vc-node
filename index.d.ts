import { UserLoginResponseDto } from "./src/dtos/user.dto";
import { User } from "./src/models/user";

export interface IRepository<T> {
  add(entity: T): T;
  remove(entityId: number): void;
  update(entity: T): T;
  fetch(entityId: number): T;
  fetchAll(): T[];
}

export interface IAuthRepository {
  signUp(user: User): Promise<string>;
  userExists(email: string): Promise<boolean>;
  getUser(email: string): Promise<UserLoginResponseDto>;
}

export type ServiceResponse<T> = {
  data: T | null;
  success: boolean;
  message: string;
};
