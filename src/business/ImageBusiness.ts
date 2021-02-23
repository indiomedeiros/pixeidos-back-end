import { ImageDatabase } from "../data/ImageDatabase";
import { Image, ImageInputDTO } from "./entities/Image";
import { CheckBusiness } from "./errors/CheckBusiness";
import { CustomError } from "./errors/CustomError";
import { Autheticator } from "./service/Authenticator";
import { IdGenerator } from "./service/IdGenerator";

export class ImageBusiness {
  constructor(
    private authenticator: Autheticator,
    private idGenerator: IdGenerator,
    private imageDatabase: ImageDatabase,
  ) {}

  public async createImage(imageInputDTO: ImageInputDTO): Promise<string> {
    try {
      const message: string = `Your image has been added to the database`;
      const { subtitle, file, tags, collection, token } = imageInputDTO;
      const check = new CheckBusiness();

      check.checkExistenceProperty(subtitle, "subtitle");
      check.checkExistenceProperty(file, "file");
      check.checkExistenceProperty(tags, "tags");
      check.checkExistenceProperty(collection, "collection");
      check.checkExistenceProperty(token, "token");

      const author = await this.authenticator.getTokenData(token);
      const id = this.idGenerator.generate();
      const date = new Date();
      const image: Image = {
        id,
        subtitle,
        author: author.id,
        date,
        file,
        tags,
        collection,
      };

      await this.imageDatabase.createImage(image);

      return message;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
