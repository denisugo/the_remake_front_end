import Product from "../../components/Product/Product.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("Product", () => {
  const props = {
    id: 1,
    key: 1,
    name: "Name",
    description: "Desc",
    price: 100,
    category: "health",
    preview: "www",
  };
  const wrapper = setUp(Product, props);

  it("Should render product", () => {
    const product = findByDataTest("product", wrapper);
    expect(product.length).toBe(1);
  });
});
