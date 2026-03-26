import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";

jest.setTimeout(10000);

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);

    const input = { type: "a", name: "Product 1", price: 100 };

    const output = await usecase.execute(input);

    const productModel = await ProductModel.findOne({ where: { id: output.id } });

    expect(productModel.toJSON()).toStrictEqual({
      id: output.id,
      name: "Product 1",
      price: 100,
    });
  });
});
