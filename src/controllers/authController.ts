import { User } from "../models/user";
import { UserLoginRequestDto, UserSignUpRequestDto } from "../dtos/user.dto";
import { HTTP_STATUS_CODE, SYSTEM_ROLE } from "../enums";
import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  signUp: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, firstName, lastName, password } =
        req.body as UserSignUpRequestDto;
      const newUser: User = {
        firstName,
        email,
        passwordHash: password,
        lastName,
        roles: SYSTEM_ROLE.GUEST,
      };

      const signUpResponse = await authService.signUp(newUser);
      if (!signUpResponse.success) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(signUpResponse.message);
      }

      res.status(HTTP_STATUS_CODE.CREATED).send(signUpResponse);
    } catch (error) {
      res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .send("Error handling user request");
      console.log(error);
    }
  },
  logIn: async (request: Request, response: Response): Promise<void> => {
    try {
      const { email, password } = request.body as UserLoginRequestDto;
      const loginResponse = await authService.login(email, password);
      if (!loginResponse.success) {
        response.status(HTTP_STATUS_CODE.BAD_REQUEST).send(loginResponse);
      }
      response.status(HTTP_STATUS_CODE.OK).send(loginResponse);
    } catch (error) {
      response
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .send("Error handling Login request");
      console.log(error);
    }
  },
};
