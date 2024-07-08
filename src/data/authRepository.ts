import { IAuthRepository } from "../../index";
import { User } from "../models/user";
import { db } from "./connectDb";
import { user } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { UserLoginResponseDto } from "../dtos/user.dto";
import { SYSTEM_ROLE } from "../enums";

interface AuthRepository extends IAuthRepository {
  signUp(user: User): Promise<string>;
  userExists(email: string): Promise<boolean>;
  getUser(email: string): Promise<UserLoginResponseDto>;
}

export const authRepository: AuthRepository = {
  signUp: async (newUser: User): Promise<string> => {
    const [{ id: userId }] = await db
      .insert(user)
      .values({
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        is_user_active: true,
        email: newUser.email,
        passwordHash: newUser.passwordHash,
        system_role: newUser.roles,
      })
      .returning({ id: user.id });
    return userId;
  },
  userExists: async (email: string): Promise<boolean> => {
    const results = await db
      .select({ userId: user.id })
      .from(user)
      .where(eq(user.email, email.toLowerCase()));
    return results.length > 0;
  },
  getUser: async (email: string): Promise<UserLoginResponseDto> => {
    const [userResult] = await db
      .select({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        birthday: user.birthday,
        roles: user.system_role,
        phoneNumber: user.phone_number,
        passwordHash: user.passwordHash,
      })
      .from(user)
      .where(eq(user.email, email.toLowerCase()));
    userResult.roles =
      SYSTEM_ROLE[userResult.roles as keyof typeof SYSTEM_ROLE];
    return userResult;
  },
};
