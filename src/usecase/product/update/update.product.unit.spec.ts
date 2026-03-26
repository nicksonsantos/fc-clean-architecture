import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    repository.find.mockResolvedValue(new Product("1", "Product 1", 100));

    const usecase = new UpdateProductUseCase(repository);

    const output = await usecase.execute({ id: "1", name: "Product Updated", price: 150 });

    expect(output).toEqual({ id: "1", name: "Product Updated", price: 150 });
    expect(repository.update).toHaveBeenCalled();
  });

  it("should throw error when price is negative", async () => {
    const repository = MockRepository();
    repository.find.mockResolvedValue(new Product("1", "Product 1", 100));

    const usecase = new UpdateProductUseCase(repository);

    await expect(
      usecase.execute({ id: "1", name: "Product 1", price: -10 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
