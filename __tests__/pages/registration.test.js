import * as reactRedux from "react-redux";
import * as UserSlice from "../../features/UserSlice/UserSlice";
import * as router from "next/router";

import registration from "../../pages/registration";
import {
  findByTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Registration page", () => {
  let dispatch;
  let wrapper;

  beforeEach(() => {
    //  Setup for react redux
    dispatch = jest.fn();

    reactRedux.useDispatch = jest.fn().mockReturnValue(dispatch);
    reactRedux.useSelector = jest.fn().mockReturnValue(true);

    UserSlice.selectUser = jest.fn();
    UserSlice.selectUserError = jest.fn();
    UserSlice.registerUser = jest.fn();

    //  Next.js router setup
    router.default.push = jest.fn();

    wrapper = setUp(registration);
  });

  describe("Rendering", () => {
    it("Should render 1 button", () => {
      const buttons = findByComponent("Button", wrapper);
      expect(buttons.length).toBe(1);
    });
    it("Should render 5 inputs", () => {
      const inputs = findByComponent("Input", wrapper);
      expect(inputs.length).toBe(5);
    });
    it("Should render 5 hints", () => {
      const hints = findByDataTest("hint", wrapper);
      expect(hints.length).toBe(5);
    });
  });

  describe("Registering", () => {
    // Unable to test sumbitting after button clicking
    describe("All fields are filled out", () => {
      it("Should register a new user", () => {
        const form = findByComponent("form", wrapper);
        expect(form.length).toBe(1);

        const firstNameField = findByComponent("Input", wrapper).first();
        firstNameField.dive().simulate("change", {
          target: { name: "First-Name", value: "spam" },
        });

        const lastNameField = findByComponent("Input", wrapper).at(1);
        lastNameField
          .dive()
          .simulate("change", { target: { name: "Last-Name", value: "spam" } });

        const emailField = findByComponent("Input", wrapper).at(2);
        emailField
          .dive()
          .simulate("change", { target: { name: "Email", value: "spam" } });

        const usernameField = findByComponent("Input", wrapper).at(3);
        usernameField.dive().simulate("change", {
          target: { name: "Username", value: "spam" },
        });

        const passwordField = findByComponent("Input", wrapper).at(4);
        passwordField
          .dive()
          .simulate("change", { target: { name: "Password", value: "spam" } });

        form.simulate("submit", { preventDefault: jest.fn() });

        expect(dispatch.mock.calls.length).toBe(1);
        // expect(reactRedux.useDispatch.mock.calls.length).toBe(3); // Should be 3 because useState rerender the component
        // expect(reactRedux.useSelector.mock.calls.length).toBe(6); // Should be 3 because useState rerender the component
      });
    });
  });
});
