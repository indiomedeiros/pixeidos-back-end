import { Image } from "../business/entities/Image";
import { BaseDatabase } from "./BaseDatabase";
import { TablesDatabase } from "./TablesDatabase";

export class ImageDatabase extends BaseDatabase {
  public async createImage(image: Image): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert(image)
        .into(TablesDatabase.PIXEIDOS_IMAGES);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
