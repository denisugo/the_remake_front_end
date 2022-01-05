import cart from "../../pages/cart";
import * as reactRedux from "react-redux";
import React from "react";
import * as UserSlice from "../../features/UserSlice/UserSlice";
import * as router from "next/router";
import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Cart page", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("Rendering", () => {
    beforeEach(() => {
      //  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(true);
      UserSlice.selectUser = jest.fn();

      //  Next.js router setup
      router.default.push = jest.fn();

      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [
          { quantity: 2, price: 100 },
          { quantity: 1, price: 50 },
          { quantity: 4, price: 25 },
        ], // =350
      });

      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());
      wrapper = setUp(cart);
    });

    it("Should render cart page", () => {
      const preview = findByDataTest("preview", wrapper);
      expect(preview.length).toBe(3);

      const name = findByDataTest("name", wrapper);
      expect(name.length).toBe(3);

      const price = findByDataTest("price", wrapper);
      expect(price.length).toBe(3);

      const quantity = findByDataTest("quantity", wrapper);
      expect(quantity.length).toBe(3);

      const total = findByDataTest("total", wrapper);
      expect(total.length).toBe(1);
      expect(total.text()).toBe("TOTAL: $350");

      const buttons = findByComponent("Button", wrapper);
      expect(buttons.length).toBe(3 + 1 + 1); // One button for redirecting to orders, one for checkout
    });
  });
  describe("Redirecting", () => {
    it("Should redirect to login page", () => {
      //  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(false);
      UserSlice.selectUser = jest.fn();

      //  Next.js router setup
      router.default.push = jest.fn();

      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [{}, {}, {}],
      });

      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

      wrapper = setUp(cart);

      expect(router.default.push.mock.calls.length).toBe(1);
    });

    it("Should redirect to order page", () => {
      //  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(true);
      UserSlice.selectUser = jest.fn();

      //  Next.js router setup
      router.default.push = jest.fn();

      wrapper = setUp(cart);

      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [], // no other buttons are on the page
      });

      const orderLinkButton = findByComponent("Button", wrapper);
      orderLinkButton.at(1).dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
    it("Should redirect to checkout page", () => {
      //  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(true);
      UserSlice.selectUser = jest.fn();

      //  Next.js router setup
      router.default.push = jest.fn();

      wrapper = setUp(cart);

      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [], // no other buttons are on the page
      });

      const checkoutLinkButton = findByComponent("Button", wrapper);
      checkoutLinkButton.at(0).dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });

  describe("Removing", () => {
    beforeEach(() => {
      //  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(true);
      UserSlice.selectUser = jest.fn();

      //  Next.js router setup
      router.default.push = jest.fn();

      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [
          { id: 1, quantity: 2, price: 100 },
          { id: 2, quantity: 1, price: 50 },
          { id: 3, quantity: 4, price: 25 },
        ], // =350
      });

      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());
      wrapper = setUp(cart);
    });

    it("Should remove item from cart", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
      });

      const removeButton = findByComponent("Button", wrapper).first();
      removeButton.dive().simulate("click");

      // Await for async handleRemove
      await new Promise((res) => setImmediate(res));

      wrapper.update();

      // There should be two items with id=2 and id=3
      const preview = findByDataTest("preview", wrapper);
      expect(preview.length).toBe(2);
    });

    it("Should NOT remove item from cart", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      const removeButton = findByComponent("Button", wrapper).first();
      removeButton.dive().simulate("click");

      // Await for async handleRemove
      await new Promise((res) => setImmediate(res));

      wrapper.update();

      // There should be two items with id=2 and id=3
      const preview = findByDataTest("preview", wrapper);
      expect(preview.length).toBe(3);
    });
  });
});
