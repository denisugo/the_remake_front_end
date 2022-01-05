import * as reactRedux from "react-redux";
import * as UserSlice from "../../features/UserSlice/UserSlice";
import * as router from "next/router";

import login from "../../pages/login";
import {
  findByTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Login page", () => {
  let dispatch;
  let wrapper;

  beforeEach(() => {
    //  Setup for react redux
    dispatch = jest.fn();

    reactRedux.useDispatch = jest.fn().mockReturnValue(dispatch);
    reactRedux.useSelector = jest.fn().mockReturnValue(true);

    UserSlice.selectUser = jest.fn();
    UserSlice.selectUserError = jest.fn();
    UserSlice.logInUser = jest.fn();

    //  Next.js router setup
    router.default.push = jest.fn();

    wrapper = setUp(login);
  });

  describe("Rendering", () => {
    it("Should render 2 buttons", () => {
      const buttons = findByComponent("Button", wrapper);
      expect(buttons.length).toBe(2);
    });
    it("Should render 2 inputs", () => {
      const fields = findByComponent("Input", wrapper);
      expect(fields.length).toBe(2);
    });
  });

  describe("Logging in", () => {
    // Unable to test sumbitting after button clicking
    describe("Both fields filled out", () => {
      it("Should log in", () => {
        const form = findByComponent("form", wrapper);
        expect(form.length).toBe(1);

        const usernameField = findByComponent("Input", wrapper).first();
        usernameField.dive().simulate("change", {
          target: { name: "Username", value: "spam" },
        });

        const passwordField = findByComponent("Input", wrapper).at(1);
        passwordField
          .dive()
          .simulate("change", { target: { name: "Password", value: "spam" } });

        form.simulate("submit", { preventDefault: jest.fn() });

        expect(dispatch.mock.calls.length).toBe(1);
        expect(reactRedux.useDispatch.mock.calls.length).toBe(3); // Should be 3 because useState rerender the component
        expect(reactRedux.useSelector.mock.calls.length).toBe(6); // Should be 6 because useState rerender the component
      });
    });
  });

  describe("Redirect to registration", () => {
    it("Should redirect to registration page", () => {
      const button = findByDataTest("to-register", wrapper);
      expect(button.length).toBe(1);

      button.dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });
});
