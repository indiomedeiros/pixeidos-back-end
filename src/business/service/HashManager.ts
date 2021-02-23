import bcrypt from "bcryptjs";

export class HashManager {
  private rounds: number = Number(process.env.BCRYPT_COST);

  public hash = async (text: string): Promise<string> => {
    const salt = await bcrypt.genSalt(this.rounds);
    const result = await bcrypt.hash(text, salt);
    return result;
  };

  public compare = async (text: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(text, hash);
  };
}
