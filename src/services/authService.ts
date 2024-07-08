import { ServiceResponse } from "../../index";
import { User } from "../models/user";
import { authRepository } from "../data/authRepository";
import bcrypt from "bcrypt";
import { UserLoginResponseDto } from "../dtos/user.dto";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const isValidCredentials = (email: string, password: string): boolean => {
  return Boolean(email) && Boolean(password);
};

const userExists = async (email: string): Promise<boolean> => {
  return authRepository.userExists(email);
};
const getUser = async (email: string): Promise<UserLoginResponseDto> => {
  return authRepository.getUser(email);
};
const checkPassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

export const authService = {
  signUp: async (newUser: User): Promise<ServiceResponse<string>> => {
    const response: ServiceResponse<string> = {
      success: false,
      message: "",
      data: null,
    };
    try {
      if (!isValidCredentials(newUser.email, newUser.passwordHash)) {
        response.message = "Invalid Credentials";
        return response;
      } else if (!newUser.firstName) {
        response.message = "Invalid User Name";
        return response;
      }
      if (await userExists(newUser.email)) {
        response.message = "User Already Exists";
        return response;
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
        data: null,
      };
    }
  },
  login: async (
    email: string,
    password: string,
  ): Promise<ServiceResponse<UserLoginResponseDto>> => {
    try {
      const response: ServiceResponse<UserLoginResponseDto> = {
        success: false,
        message: "",
        data: null,
      };
      const userData = await getUser(email);
      if (!userData.id) {
        response.message = "User does not exist";
        return response;
      }
      if (!(await checkPassword(password, userData.passwordHash))) {
        response.message = "Wrong Password";
        return response;
      }
      response.success = true;
      response.data = userData;
      return response;
    } catch (error) {
      return {
        success: false,
        message: "Error Logging In User",
        data: null,
      };
    }
  },
};
