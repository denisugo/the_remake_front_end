import App from "../../../pages/index.js";
import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../../utils/testUtils.js";

describe("Index page", () => {
  const props = {
    user: null,
    list: [],
  };

  const wrapper = findByComponent("MainDesktop", setUp(App, props))
    .first()
    .dive();

  it("Should render header", () => {
    console.log(wrapper.debug());
    const header = findByComponent("HeaderDesktop", wrapper);
    expect(header.length).toBe(1);
  });
  it("Should render productlist", () => {
    const productlist = findByComponent("ProductListDesktop", wrapper);
    expect(productlist.length).toBe(1);
  });
});
