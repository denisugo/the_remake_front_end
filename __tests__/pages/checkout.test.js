import checkout from "../../pages/checkout";
import React from "react";

import {
  findByDTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Checkout page", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("Rendering", () => {
    beforeEach(() => {
      //* Mock useeffect implementatio
      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

      //* Mock props
      const props = { user: {} };
      wrapper = setUp(checkout, props);
    });

    it("Should render orders page", () => {
      //* Locate 'elements' element
      const elements = findByDataTest("elements", wrapper);
      expect(elements.length).toBe(1);
    });
  });
});
