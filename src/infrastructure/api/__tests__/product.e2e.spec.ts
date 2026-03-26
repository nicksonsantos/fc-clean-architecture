import { app, sequelize } from "../express";
import request from "supertest";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("E2E test for product list", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("1", "Product 1", 100));
    await productRepository.create(new Product("2", "Product 2", 200));

    const response = await request(app).get("/product").send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "1", name: "Product 1", price: 100 }),
        expect.objectContaining({ id: "2", name: "Product 2", price: 200 }),
      ])
    );
  });
});
