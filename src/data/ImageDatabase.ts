import { Image } from "../business/entities/Image";
import { BaseDatabase } from "./BaseDatabase";
import { TablesDatabase } from "./TablesDatabase";

export class ImageDatabase extends BaseDatabase {
  public async createImage(image: Image): Promise<void> {
    try {
      // const result = this.changeArrayToString(image);
      await BaseDatabase.connection
        .insert(image)
        .into(TablesDatabase.PIXEIDOS_IMAGES);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllImages(): Promise<Image[]> {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(TablesDatabase.PIXEIDOS_IMAGES);
      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getImageById(id: string): Promise<Image> {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(TablesDatabase.PIXEIDOS_IMAGES)
        .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async searchImage(dataSearch: string): Promise<Image[]> {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(TablesDatabase.PIXEIDOS_IMAGES)
        .where("tags", "LIKE", `%${dataSearch}%`);

      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
