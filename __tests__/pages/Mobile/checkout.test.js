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
      const props = { user: {}, isMobile: true };
      wrapper = setUp(checkout, props);
      wrapper = findByComponent("CheckoutMobile", wrapper).first().dive();
    });

    it("Should render orders page", () => {
      //* Locate 'CheckoutFormMobile' element
      const CheckoutFormDesktop = findByComponent(
        "CheckoutFormMobile",
        wrapper
      );
      expect(CheckoutFormDesktop.length).toBe(1);
    });
  });
});
