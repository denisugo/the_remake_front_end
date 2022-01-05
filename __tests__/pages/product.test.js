import product from "../../pages/product";
import * as reactRedux from "react-redux";
import * as UserSlice from "../../features/UserSlice/UserSlice";
import * as router from "next/router";
import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Product page", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    //  Redux router setup
    // reactRedux.useSelector = jest.fn().mockReturnValue(false);
    // UserSlice.selectUser = jest.fn();

    // Vars setup
    global.window = {};
    global.window.open = jest.fn();

    //  Next.js router setup
    //router.default.push = jest.fn();

    // Props setup
    props = {
      id: 9,
      name: "product",
      price: 100,
      description: "Ahah",
      preview: "www",
      user: null, //{id:1}
    };

    wrapper = setUp(product, props);
  });

  describe("Rendering", () => {
    it("Should render product page", () => {
      const preview = findByDataTest("preview", wrapper);
      expect(preview.length).toBe(1);

      const description = findByDataTest("description", wrapper);
      expect(description.length).toBe(1);

      const name = findByDataTest("name", wrapper);
      expect(name.length).toBe(1);

      const price = findByDataTest("price", wrapper);
      expect(price.length).toBe(1);

      const youShouldLogin = findByDataTest("you-should-login", wrapper);
      expect(youShouldLogin.length).toBe(1);
    });
    it("Should render quantity and add", () => {
      //   reactRedux.useSelector = jest.fn().mockReturnValue(true);
      //   UserSlice.selectUser = jest.fn();
      props.user = { id: 1 };
      wrapper = setUp(product, props);

      const quantity = findByComponent("Input", wrapper);
      expect(quantity.length).toBe(1);

      const add = findByComponent("Button", wrapper);
      expect(add.length).toBe(1);
    });
  });
  describe("Redirecting", () => {
    it("Should redirect to login page", () => {
      const youShouldLogin = findByDataTest("you-should-login", wrapper);
      const button = findByComponent("Button", youShouldLogin);
      button.first().dive().simulate("click");
      expect(window.open.mock.calls.length).toBe(1);
      //expect(router.default.push.mock.calls.length).toBe(1);
    });
  });

  describe("Adding items to a cart", () => {
    beforeEach(() => {
      props.user = { id: 1 };
      wrapper = setUp(product, props);
    });
    it("Should add item to a cart", () => {
      const add = findByComponent("Button", wrapper);

      add.first().dive().simulate("click");
      expect(fetch.mock.calls.length).toBe(1);
    });

    it("Should change a quantity of a product", () => {
      let quantity = findByComponent("Input", wrapper);
      quantity
        .first()
        .dive()
        .simulate("change", { target: { value: 2 } });

      wrapper.update();
      quantity = findByComponent("Input", wrapper);
      expect(quantity.prop("value")).toBe(2);
    });
    it("Should NOT change a quantity of a product", () => {
      let quantity = findByComponent("Input", wrapper);
      quantity
        .first()
        .dive()
        .simulate("change", { target: { value: "r" } });

      wrapper.update();
      quantity = findByComponent("Input", wrapper);
      expect(quantity.prop("value")).toBe(1);
    });
  });
});
