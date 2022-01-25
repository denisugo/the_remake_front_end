import checkout from "../../../pages/checkout";
import React from "react";
import * as Stripe from "@stripe/react-stripe-js";

import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../../utils/testUtils.js";

describe("Checkout page", () => {
  let wrapper;

  beforeEach(() => {
    Stripe.useStripe = jest.fn().mockReturnValueOnce("valid");
    Stripe.useElements = jest.fn().mockReturnValueOnce("valid");

    fetch.resetMocks();
  });

  describe("Rendering", () => {
    beforeEach(() => {
      //* Mock useeffect implementatio
      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

      //* Mock props
      const props = { user: {} };
      wrapper = setUp(checkout, props);
      wrapper = findByComponent("CheckoutDesktop", wrapper).first().dive();
    });

    it("Should render orders page", () => {
      //* Locate 'CheckoutFormDesktop' element
      const CheckoutFormDesktop = findByComponent(
        "CheckoutFormDesktop",
        wrapper
      );
      expect(CheckoutFormDesktop.length).toBe(1);
    });
  });
});
