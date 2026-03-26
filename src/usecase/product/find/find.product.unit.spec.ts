import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    repository.find.mockResolvedValue(new Product("1", "Product 1", 100));

    const usecase = new FindProductUseCase(repository);

    const output = await usecase.execute({ id: "1" });

    expect(output).toEqual({ id: "1", name: "Product 1", price: 100 });
    expect(repository.find).toHaveBeenCalledWith("1");
  });
});
