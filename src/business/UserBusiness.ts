import { UserDatabase } from "../data/UserDatabase";
import { User, UserInputDTO } from "./entities/User";
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
    const { name, email, password } = userInputDTO;

    const id = this.idGenerator.generate();
    const hashPassword = await this.hashManager.hash(password);
    const user: User = {
      id,
      name,
      email,
      password: hashPassword,
    };

    await this.userDatabase.createUser(user);

    const acessToken = this.authenticator.generateToken({ id });

    return acessToken;
  };
}
