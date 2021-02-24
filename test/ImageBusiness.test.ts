import { ImageInputDTO } from "../src/business/entities/Image";
import { ImageBusiness } from "../src/business/ImageBusiness";

const authenticator = { generateToken: jest.fn() } as any;
const idGenerator = { generate: jest.fn(() => "test") } as any;
const imageDatabase = { createImage: jest.fn() } as any;

const imageBusiness: ImageBusiness = new ImageBusiness(
  authenticator,
  idGenerator,
  imageDatabase
);

describe("Testing image create", () => {
  test("Shold return error in propety 'file'", async () => {
    expect.assertions(2);
    try {
      const input: ImageInputDTO = {
        subtitle: "Crianças brincando no deserto",
        file: "",
        tags: [
          "Crianças",
          "Infância",
          "Jogos",
          "Jogar",
          "Diversão",
          "Brincalhão",
        ],
        collection: "vida",
        token: "sefnesifesbfisefef",
      };

      await imageBusiness.createImage(input);
    } catch (error) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe(`'file' not found`);
    }
  });

  test("Shold return error in propety 'collection'", async () => {
    expect.assertions(2);
    try {
      const input: ImageInputDTO = {
        subtitle: "Crianças brincando no deserto",
        file: "https://pixabay.com/images/id-5833685/",
        tags: [
          "Crianças",
          "Infância",
          "Jogos",
          "Jogar",
          "Diversão",
          "Brincalhão",
        ],
        collection: "",
        token: "sefnesifesbfisefef",
      };

      await imageBusiness.createImage(input);
    } catch (error) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe(`'collection' not found`);
    }
  });
});
