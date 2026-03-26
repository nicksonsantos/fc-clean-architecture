import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

jest.setTimeout(10000);

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const usecase = new UpdateProductUseCase(repository);

    await repository.create(new Product("1", "Product 1", 100));

    const output = await usecase.execute({ id: "1", name: "Updated Product", price: 150 });

    expect(output).toEqual({ id: "1", name: "Updated Product", price: 150 });

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    expect(productModel.toJSON()).toStrictEqual({ id: "1", name: "Updated Product", price: 150 });
  });
});
