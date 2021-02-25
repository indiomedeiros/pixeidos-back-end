import { CustomError } from "./CustomError";

export class CheckBusiness {
  public checkExistenceProperty = (reqPropety: any, propretyName: string) => {
    if (!reqPropety || reqPropety === undefined) {
      throw new CustomError(406, `'${propretyName}' not found`);
    }
  };

  public checkEmailFormat = (email: string) => {
    this.checkExistenceProperty(email, "email");
    if (email.indexOf("@") === -1) {
      throw new CustomError(
        406,
        "check the format of the 'email' property, @ is required"
      );
    }
  };

  public checkPasswordFormat = (password: string) => {
    this.checkExistenceProperty(password, "password");
    if (password.length < 6) {
      throw new CustomError(
        406,
        " is password required whith minimum 6 caracteres"
      );
    }
  };

  public checkExistenceObject = (reqObject: any, message: string) => {
    if (!reqObject || reqObject === undefined) {
      throw new CustomError(404, `${message}`);
    }
  };

  public checkExistenceArray = (reqArray: any, message: string) => {
    if (!reqArray || reqArray.length === 0) {
      throw new CustomError(404, `${message}`);
    }
  };
}
