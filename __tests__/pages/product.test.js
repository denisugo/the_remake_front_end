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

    //* Global setup
    global.window = {};
    global.window.open = jest.fn();

    //* Mock alert
    global.alert = jest.fn();

    //* Reset fetch mock
    fetch.resetMocks();

    //  Next.js router setup
    //router.default.push = jest.fn();

    //* Props setup
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

      //? User is null
      const youShouldLoginButton = findByDataTest(
        "you-should-login-button",
        wrapper
      );
      expect(youShouldLoginButton.length).toBe(1);
    });
    it("Should render quantity and add", () => {
      //* Set user object
      //? Now it should not render 'you should login' button
      //? It should render 'add to cart' button and 'quantity' input
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
      //* Locate the button
      const youShouldLoginButton = findByDataTest(
        "you-should-login-button",
        wrapper
      );

      youShouldLoginButton.first().dive().simulate("click");
      expect(window.open.mock.calls.length).toBe(1);
    });
  });

  describe("Adding items to a cart", () => {
    beforeEach(() => {
      //* Set user object
      //? Now it should not render 'you should login' button
      //? It should render 'add to cart' button and 'quantity' input
      props.user = { id: 1 };
      wrapper = setUp(product, props);
    });
    it("Should add item to a cart", () => {
      //* Locate the button and click it
      const add = findByDataTest("add-to-cart-button", wrapper);
      add.first().dive().simulate("click");

      expect(fetch.mock.calls.length).toBe(1);
    });

    it("Should change a quantity of a product", () => {
      //* locate quantity input and insert a new value
      let quantity = findByDataTest("quantity-input", wrapper);
      quantity
        .first()
        .dive()
        .simulate("change", { target: { value: 2 } });

      //* Update wrapper
      wrapper.update();

      //* locate quantity input after the wrapper update
      quantity = findByComponent("Input", wrapper);
      expect(quantity.prop("value")).toBe(2);
    });
    it("Should NOT change a quantity of a product", () => {
      //* locate quantity input and insert a new value
      let quantity = findByDataTest("quantity-input", wrapper);
      quantity
        .first()
        .dive()
        .simulate("change", { target: { value: "r" } });

      //* Update wrapper
      wrapper.update();

      //* locate quantity input after the wrapper update
      quantity = findByComponent("Input", wrapper);
      expect(quantity.prop("value")).toBe(1);
    });
  });
});
