import express from "express";
import { ImageController } from "../../controller/ImageController";

export const imageRouter = express.Router();
const imageController = new ImageController();

imageRouter.post("/create", imageController.createImage);
imageRouter.get("/all", imageController.getAllImages);
imageRouter.get("/search", imageController.searchImage)
imageRouter.get("/:id", imageController.getImageById)
