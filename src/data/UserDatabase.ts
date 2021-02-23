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

  public selectUserByEmail = async (email: string): Promise<User> => {
    try {
    const result =  await BaseDatabase.connection
        .select("*")
        .from(TablesDatabase.PIXEIDOS_USERS)
        .where({email})

    return result[0]
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
