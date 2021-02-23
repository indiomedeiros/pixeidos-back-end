import { UserDatabase } from "../data/UserDatabase";
import { User, UserInputDTO } from "./entities/User";
import { CheckBusiness } from "./errors/CheckBusiness";
import { CustomError } from "./errors/CustomError";
import { Autheticator } from "./service/Authenticator";
import { HashManager } from "./service/HashManager";
import { IdGenerator } from "./service/IdGenerator";

export class UserBusiness {
  constructor(
    private hashManager: HashManager,
    private authenticator: Autheticator,
    private idGenerator: IdGenerator,
    private userDatabase: UserDatabase
  ) {}

  createUser = async (userInputDTO: UserInputDTO): Promise<string> => {
    try {
      const { name, email, nickname, password } = userInputDTO;
      const check = new CheckBusiness();

      check.checkExistenceProperty(name, "name");
      check.checkEmailFormat(email);
      check.checkExistenceProperty(nickname, "nickname");
      check.checkPasswordFormat(password);

      const id = this.idGenerator.generate();
      const hashPassword = await this.hashManager.hash(password);
      const user: User = {
        id,
        name,
        email,
        nickname,
        password: hashPassword,
      };

      await this.userDatabase.createUser(user);

      const acessToken = this.authenticator.generateToken({ id });

      return acessToken;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  };
}
