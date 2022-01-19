import cart from "../../pages/cart";
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
      //*  Next.js router setup
      router.default.push = jest.fn();

      //* Props setup
      const props = {
        cartItems: [
          { quantity: 2, price: 100 },
          { quantity: 1, price: 50 },
          { quantity: 4, price: 25 },
        ],
        user: {},
      };
      wrapper = setUp(cart, props);
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
      expect(buttons.length).toBe(3 + 1 + 1); //? One button for redirecting to orders, one for checkout
    });
  });
  describe("Redirecting", () => {
    beforeEach(() => {
      //*  Next.js router setup
      router.default.push = jest.fn();

      //* Props setup
      const props = {
        cartItems: [
          { quantity: 2, price: 100 },
          { quantity: 1, price: 50 },
          { quantity: 4, price: 25 },
        ],
        user: {},
      };
      wrapper = setUp(cart, props);
    });

    it("Should redirect to order page", () => {
      //* Locate the 'view my orders' button and click it
      const orderButton = findByDataTest("view-orders-button", wrapper);
      orderButton.at(0).dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
    it("Should redirect to checkout page", () => {
      //* Locate the 'Checkout your cart' button and click it
      const checkoutLinkButton = findByDataTest("checkout-button", wrapper);
      checkoutLinkButton.at(0).dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });

  describe("Removing", () => {
    beforeEach(() => {
      //* Props setup
      const props = {
        cartItems: [
          { quantity: 2, price: 100, product_id: 1 },
          { quantity: 1, price: 50, product_id: 2 },
          { quantity: 4, price: 25, product_id: 3 },
        ],
        user: {},
      };
      wrapper = setUp(cart, props);
    });

    it("Should remove item from cart", async () => {
      //* Mock fetch
      fetch.mockResolvedValueOnce({
        ok: true,
      });

      //* Locate cancel button and click it
      const cancelButton = findByDataTest("cancel-button", wrapper);
      cancelButton.first().dive().simulate("click");

      //? This will execute async function in cart.js immidiately
      await new Promise((res) => setImmediate(res));

      //* Update wrapper
      wrapper.update();

      //? There should be two items with id=2 and id=3
      const preview = findByDataTest("preview", wrapper);
      expect(preview.length).toBe(2);
    });

    it("Should NOT remove item from cart", async () => {
      //* Mock fetch
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      //* Locate cancel button and click it
      const cancelButton = findByDataTest("cancel-button", wrapper);
      cancelButton.first().dive().simulate("click");

      //? This will execute async function in cart.js immidiately
      await new Promise((res) => setImmediate(res));

      //* Update wrapper
      wrapper.update();

      const preview = findByDataTest("preview", wrapper);
      expect(preview.length).toBe(3);
    });
  });
});
