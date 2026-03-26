import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test list product use case", () => {
  it("should list products", async () => {
    const repository = MockRepository();
    repository.findAll.mockResolvedValue([
      new Product("1", "Product 1", 100),
      new Product("2", "Product 2", 200),
    ]);

    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute({});

    expect(output).toEqual({
      products: [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 2", price: 200 },
      ],
    });
    expect(repository.findAll).toHaveBeenCalled();
  });
});
