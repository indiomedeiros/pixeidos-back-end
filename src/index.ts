import express from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { userRouter } from "./data/routes/userRouter";
import { imageRouter } from "./data/routes/imageRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/image", imageRouter);

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server`);
  }
});
