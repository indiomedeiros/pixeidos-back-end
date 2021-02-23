import { UserDatabase } from "../data/UserDatabase";
import { LoginInputDTO, User, UserInputDTO } from "./entities/User";
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

  public async createUser(userInputDTO: UserInputDTO): Promise<string> {
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
  }

  public async getUserByEmail(loginInputDTO: LoginInputDTO): Promise<string> {
    try {
      const { email, password } = loginInputDTO;
      const check = new CheckBusiness();

      check.checkEmailFormat(email);
      check.checkPasswordFormat(password);

      const user: User = await this.userDatabase.selectUserByEmail(email);
      check.checkExistenceObject(user, "User not found");

      const passwordIsCorrect: boolean = await this.hashManager.compare(
        password,
        user.password
      );

      check.checkExistenceObject(passwordIsCorrect, "Incorrect password");

      const acessToken = this.authenticator.generateToken({ id: user.id });

      return acessToken;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
