import { User } from "./src/models/user";

export interface IRepository<T> {
  add(entity: T): T;
  remove(entityId: number): void;
  update(entity: T): T;
  fetch(entityId: number): T;
  fetchAll(): T[];
}

export interface IAuthRepository<T> {
  login(entity: T): Promise<T>;
  signUp(entity: T): Promise<number>;
}

export type ServiceResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
