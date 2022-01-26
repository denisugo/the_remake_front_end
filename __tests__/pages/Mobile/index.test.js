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
    isMobile: true,
  };

  const wrapper = findByComponent("MainMobile", setUp(App, props))
    .first()
    .dive();

  it("Should render header", () => {
    console.log(wrapper.debug());
    const header = findByComponent("HeaderMobile", wrapper);
    expect(header.length).toBe(1);
  });
  it("Should render productlist", () => {
    const productlist = findByComponent("ProductListMobile", wrapper);
    expect(productlist.length).toBe(1);
  });
});
