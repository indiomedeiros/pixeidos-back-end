import { User } from "../business/entities/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "PIXEIDOS_USERS";

  public createUser = async (user: User): Promise<void> => {
    try {
      await BaseDatabase.connection.insert(user).into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
