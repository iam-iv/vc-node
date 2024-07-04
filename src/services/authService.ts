import { ServiceResponse } from "../../index";
import { User } from "../models/user";
import { authRepository } from "../data/authRepository";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const isValidCredentials = (email: string, password: string): boolean => {
  return !email && !password;
};

const userExists = async (email: string): Promise<boolean> => {
  return authRepository.userExists(email);
};

export const authService = {
  signUp: async (newUser: User): Promise<ServiceResponse<number>> => {
    const response: ServiceResponse<number> = {
      success: false,
      message: "",
      data: 0,
    };
    try {
      if (!isValidCredentials(newUser.email, newUser.passwordHash)) {
        response.success = false;
        return response;
      }
      if (await userExists(newUser.email)) {
        response.success = false;
        response.message = "User Already Exists";
      }
      newUser.passwordHash = await hashPassword(newUser.passwordHash);

      const userId = await authRepository.signUp(newUser);
      response.success = true;
      response.message = "User successfully created";
      response.data = userId;
      return response;
    } catch (error) {
      return {
        success: false,
        message: "Error Storing User",
        data: 0,
      };
    }
  },
};
