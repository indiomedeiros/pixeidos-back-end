import { BaseDatabase } from "./BaseDatabase";
import { TablesDatabase } from "./TablesDatabase";

class CreateTables extends BaseDatabase {
  public createTables = async (): Promise<void> => {
    try {
      await BaseDatabase.connection.raw(`
        CREATE TABLE ${TablesDatabase.PIXEIDOS_USERS} (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            nickname VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );
        `);
      console.log("Tables have been created!");
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}

const tables = new CreateTables();
tables.createTables();
