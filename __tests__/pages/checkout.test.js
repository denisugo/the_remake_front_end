import checkout from "../../pages/checkout";
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

describe("Checkout page", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("Rendering", () => {
    beforeEach(() => {
      //*  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(true);
      UserSlice.selectUser = jest.fn();

      //*  Next.js router setup
      router.default.push = jest.fn();

      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

      wrapper = setUp(checkout);
    });

    it("Should render orders page", () => {
      const elements = findByDataTest("elements", wrapper);
      expect(elements.length).toBe(1);
    });
  });

  describe("Redirecting", () => {
    it("Should redirect to login page", () => {
      //*  Redux router setup
      reactRedux.useSelector = jest.fn().mockReturnValue(false);
      UserSlice.selectUser = jest.fn();

      //*  Next.js router setup
      router.default.push = jest.fn();

      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

      wrapper = setUp(checkout);

      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });
});
