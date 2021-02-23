import { Request, Response } from "express";
import { LoginInputDTO, UserInputDTO } from "../business/entities/User";
import { Autheticator } from "../business/service/Authenticator";
import { HashManager } from "../business/service/HashManager";
import { IdGenerator } from "../business/service/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
  new HashManager(),
  new Autheticator(),
  new IdGenerator(),
  new UserDatabase()
);

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, nickname, password } = req.body;
      const user: UserInputDTO = {
        name,
        email,
        nickname,
        password,
      };

      const token = await userBusiness.createUser(user);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const loginInputDTO: LoginInputDTO = {
        email,
        password
      };

      const token = await userBusiness.getUserByEmail(loginInputDTO);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
