import ProductList from "../../components/ProductList/ProductList.js";
import {
  findByComponent,
  findByDataTest,
  findByDTextChildren,
  setUp,
} from "../../utils/testUtils.js";

describe("ProductList", () => {
  const props = {
    list: [
      {
        id: 1,
        name: "Name",
        description: "Desc",
        price: 100,
        category: "health",
        preview: "www",
      },
      {
        id: 2,
        name: "Name",
        description: "Desc",
        price: 100,
        category: "health",
        preview: "www",
      },
    ],
  };
  const wrapper = setUp(ProductList, props);

  it("Should render productlist", () => {
    const productlist = findByDataTest("productlist", wrapper);
    expect(productlist.length).toBe(1);
  });
  it("Should render products", () => {
    const products = findByComponent("Product", wrapper);
    expect(products.length).toBe(2);
  });
});
