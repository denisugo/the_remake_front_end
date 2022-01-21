import App from "../../pages/index.js";
import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Index page", () => {
  const props = {
    user: null,
    list: [],
    // isMobile: false,
  };

  const wrapper = setUp(App, props);

  it("Should render header", () => {
    const header = findByComponent("Header", wrapper);
    expect(header.length).toBe(1);
    // expect(header.get(0).props).toHaveProperty("isMobile", props.isMobile);
  });
  it("Should render productlist", () => {
    const productlist = findByComponent("ProductList", wrapper);
    expect(productlist.length).toBe(1);
    // expect(productlist.get(0).props).toHaveProperty("isMobile", props.isMobile);
  });
});
