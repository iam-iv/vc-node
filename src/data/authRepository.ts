import { IAuthRepository } from "../../index";
import { User } from "../models/user";
import { db } from "./connectDb";
import { user } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

interface AuthRepository extends IAuthRepository<User> {
  login(user: User): Promise<User>;
  signUp(user: User): Promise<number>;
  userExists(email: string): Promise<boolean>;
}
export const authRepository: AuthRepository = {
  login(entity: User): Promise<User> {
    return Promise.resolve({} as User);
  },
  signUp: async (newUser: User): Promise<number> => {
    const [{ id: userId }] = await db
      .insert(user)
      .values({
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        is_user_active: true,
        email: newUser.email,
        passwordHash: newUser.passwordHash,
        system_role: [...newUser.roles],
        id: 0,
      })
      .returning({ id: user.id });
    return userId;
  },
  userExists: async (email: string): Promise<boolean> => {
    const results = await db
      .select({ userId: user.id })
      .from(user)
      .where(eq(user.email, email));
    return results.length > 0;
  },
};
