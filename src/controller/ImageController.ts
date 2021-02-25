import { Request, Response } from "express";
import { Image, ImageInputDTO } from "../business/entities/Image";
import { ImageBusiness } from "../business/ImageBusiness";
import { Autheticator } from "../business/service/Authenticator";
import { IdGenerator } from "../business/service/IdGenerator";
import { ImageDatabase } from "../data/ImageDatabase";

const imageBusiness = new ImageBusiness(
  new Autheticator(),
  new IdGenerator(),
  new ImageDatabase()
);

export class ImageController {
  public async createImage(req: Request, res: Response): Promise<void> {
    try {
      const { subtitle, file, tags, collection } = req.body;
      const token = req.headers.authorization as string;
      const imageInputDTO: ImageInputDTO = {
        subtitle,
        file,
        tags,
        collection,
        token,
      };

      const message: string = await imageBusiness.createImage(imageInputDTO);

      res.status(200).send({ message });
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send(error.sqlMessage || error.message);
    }
  }

  public async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;

      const result = await imageBusiness.getAllImages(token);

      res.status(200).send(result);
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send(error.sqlMessage || error.message);
    }
  }

  public async getImageById(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id

      const result = await imageBusiness.getImageById(token, id);

      res.status(200).send(result);
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send(error.sqlMessage || error.message);
    }
  }

  public async searchImage(req: Request, res: Response): Promise<void> {
    try {
      const dataSearch = req.query.dataSearch as string
      
      const result: Image[] = await imageBusiness.searchImage(dataSearch)

      res.status(200).send(result);
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send(error.sqlMessage || error.message);
    }
  }
}
