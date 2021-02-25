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
    private imageDatabase: ImageDatabase
  ) {}

  public async createImage(imageInputDTO: ImageInputDTO): Promise<string> {
    try {
      const message: string = `Image create sucess!`;
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

  public async getAllImages(token: string): Promise<Image[]> {
    try {
      const check = new CheckBusiness();
      check.checkExistenceProperty(token, "token");

      await this.authenticator.getTokenData(token);

      const result: Image[] = await this.imageDatabase.getAllImages();
      check.checkExistenceArray(
        result,
        "There are no images"
      );
      return result;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

  public async getImageById(token: string, id: string): Promise<Image> {
    try {
      const check = new CheckBusiness();
      check.checkExistenceProperty(token, "token");
      check.checkExistenceProperty(id, "id");

      await this.authenticator.getTokenData(token);

      const result: Image = await this.imageDatabase.getImageById(id);
      check.checkExistenceObject(
        result,
        "Nothing was found from the given 'id'"
      );
      return result;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

  public async searchImage(dataSearch: string): Promise<Image[]> {
    try {
      const check = new CheckBusiness();
      check.checkExistenceProperty(dataSearch, "dataSearch");

      const result: Image[] = await this.imageDatabase.searchImage(dataSearch);
      check.checkExistenceArray(
        result,
        "Nothing was found from the given data search"
      );
      return result;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
