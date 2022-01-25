import orders from "../../../pages/orders";
import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../../utils/testUtils.js";

describe("Orders page", () => {
  let props;
  let wrapper;

  describe("Rendering", () => {
    beforeEach(() => {
      //* Mock props
      props = {
        isMobile: true,
        items: {
          1: {
            shipped: false,
            products: [
              { quantity: 2, product_id: 100, name: "aaa" },
              { quantity: 2, product_id: 1, name: "aaa" },
              { quantity: 2, product_id: 10, name: "aaa" },
            ],
          },
        },
      };

      wrapper = setUp(orders, props);
      wrapper = findByComponent("OrdersMobile", wrapper).first().dive();
    });

    it("Should render orders page", () => {
      //* Locate all product names
      const name = findByDataTest("name", wrapper);
      expect(name.length).toBe(3);

      //* Locate all product quantities
      const quantity = findByDataTest("quantity", wrapper);
      expect(quantity.length).toBe(3);
    });
  });
});
