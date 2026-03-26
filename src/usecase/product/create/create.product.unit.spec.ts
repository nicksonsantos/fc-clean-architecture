import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Product 1",
  price: 100,
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
    expect(repository.create).toHaveBeenCalled();
  });

  it("should throw error when name is missing", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);

    await expect(
      usecase.execute({ ...input, name: "" })
    ).rejects.toThrow("Name is required");
  });

  it("should throw error when price is negative", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);

    await expect(
      usecase.execute({ ...input, price: -10 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
