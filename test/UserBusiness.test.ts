import { LoginInputDTO, UserInputDTO } from "../src/business/entities/User";
import { UserBusiness } from "../src/business/UserBusiness";

const idGenerator = { generate: jest.fn(() => "test") } as any;
const hashManager = { hash: jest.fn(), compare: jest.fn() } as any;
const authenticator = { generateToken: jest.fn() } as any;
const userDatabase = { createUser: jest.fn() } as any;

const userBusiness: UserBusiness = new UserBusiness(
  idGenerator,
  hashManager,
  authenticator,
  userDatabase
);

describe("Testing user registration", () => {
  test("Should return 'name' not found", async () => {
    expect.assertions(2);
    try {
      const input: UserInputDTO = {
        name: "",
        email: "bboyindio@gmail.com",
        nickname: "Ìndio",
        password: "12345678",
      };

      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe("'name' not found");
    }
  });

  test("Should return password length error", async () => {
    expect.assertions(2);
    try {
      const input: UserInputDTO = {
        name: "Índio Medeiros",
        email: "bboyindio@gmail.com",
        nickname: "Ìndio",
        password: "12345",
      };

      await userBusiness.createUser(input);
    } catch (error) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe(
        " is password required whith minimum 6 caracteres"
      );
    }
  });

  test("Shoulder return Sucess!", async () => {
    try {
      const input: UserInputDTO = {
        name: "Índio Medeiros",
        email: "bboyindio@gmail.com",
        nickname: "Ìndio",
        password: "1234567",
      };

      await userBusiness.createUser(input);
    } catch (error) {}
  });

  test("Should return password not found", async () => {
    expect.assertions(2);
    try {
      const input: LoginInputDTO = {
        email: "bboyindio@gmail.com",
        password: "",
      };

      await userBusiness.getUserByEmail(input);
    } catch (error) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe("'password' not found");
    }
  });

  test("Should return email not found", async () => {
    expect.assertions(2);
    try {
      const input: LoginInputDTO = {
        email: "",
        password: "12345678",
      };

      await userBusiness.getUserByEmail(input);
    } catch (error) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe("'email' not found");
    }
  });

  test("Should return Sucess!", async () => {
    try {
      const input: LoginInputDTO = {
        email: "bboyindio@gmail.com",
        password: "12345678",
      };

      await userBusiness.getUserByEmail(input);
    } catch (error) {}
  });
});
