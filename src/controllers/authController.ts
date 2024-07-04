import { User } from "../models/user";
import { UserLoginRequestDto, UserSignUpRequestDto } from "../dtos/user.dto";
import { SYSTEM_ROLE } from "../enums";
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
        roles: [SYSTEM_ROLE.GUEST],
      };

      const signUpResponse = await authService.signUp(newUser);
      if (!signUpResponse.success) {
        res.status(400).send(signUpResponse.message);
      }
      res.status(200).send(signUpResponse);
    } catch (error) {
      res.status(400).send("Error handling user request");
    }
  },
  logIn: ({ email, password }: UserLoginRequestDto) => {},
};
