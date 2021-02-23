import { User } from "../business/entities/User";
import { BaseDatabase } from "./BaseDatabase";
import { TablesDatabase } from "./TablesDatabase";

export class UserDatabase extends BaseDatabase {
  public createUser = async (user: User): Promise<void> => {
    try {
      await BaseDatabase.connection
        .insert(user)
        .into(TablesDatabase.PIXEIDOS_USERS);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
