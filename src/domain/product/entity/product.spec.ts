import Product from "./product";
import NotificationError from "../../@shared/notification/notification.error";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError(NotificationError);
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError(NotificationError);
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrowError(NotificationError);
  });

  it("should throw a notification error with two messages for name and price", () => {
    try {
      new Product("123", "", -1);
    } catch (e) {
      expect(e).toBeInstanceOf(NotificationError);
      const error = e as NotificationError;
      expect(error.errors.length).toBe(2);
      expect(error.message).toContain("Name is required");
      expect(error.message).toContain("Price must be greater than zero");
    }
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
