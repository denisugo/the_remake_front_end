import * as router from "next/router";
import * as jwt from "jsonwebtoken";

import login from "../../pages/login";
import {
  findByTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("Login page", () => {
  let wrapper;

  beforeEach(() => {
    //* Reset fetch mock
    fetch.resetMocks();

    //* jwt setup
    jwt.default.sign = jest.fn();

    //*  Next.js router setup
    router.default.push = jest.fn();

    //* Wrap the component (page)
    wrapper = setUp(login);
  });

  describe("Rendering", () => {
    it("Should render 3 buttons", () => {
      const buttons = findByComponent("Button", wrapper);
      expect(buttons.length).toBe(3);
    });
    it("Should render 2 inputs", () => {
      const fields = findByComponent("Input", wrapper);
      expect(fields.length).toBe(2);
    });
  });

  describe("Logging in", () => {
    //! Unable to test sumbitting after button clicking
    describe("Both fields filled out", () => {
      it("Should log in", async () => {
        //? Mocking fetch
        fetch.mockResolvedValueOnce({
          ok: true,
          json: () => {
            return {};
          },
        });

        //? Getting form object
        const form = findByComponent("form", wrapper);
        expect(form.length).toBe(1);

        //? Setting up values in password field an username field
        //? The real username and password aren't required here. The success case will be simulated by jest.fn()
        const usernameField = findByComponent("Input", wrapper).first();
        usernameField.dive().simulate("change", {
          target: { name: "Username", value: "spam" },
        });

        const passwordField = findByComponent("Input", wrapper).at(1);
        passwordField
          .dive()
          .simulate("change", { target: { name: "Password", value: "spam" } });

        //? Finally submitting the form
        form.simulate("submit", { preventDefault: jest.fn() });

        //? This will execute async function in login.js immidiately
        await new Promise((res) => setImmediate(res));

        expect(jwt.default.sign.mock.calls.length).toBe(1);
        expect(router.default.push.mock.calls.length).toBe(1);
      });
      it("Should fail logining in", async () => {
        //? Mocking fetch
        fetch.mockResolvedValueOnce({
          ok: false,
          json: () => {
            return {};
          },
        });

        //? Getting form object
        const form = findByComponent("form", wrapper);
        expect(form.length).toBe(1);

        //? Setting up values in password field an username field
        //? The real username and password aren't required here. The success case will be simulated by jest.fn()
        const usernameField = findByComponent("Input", wrapper).first();
        usernameField.dive().simulate("change", {
          target: { name: "Username", value: "spam" },
        });

        const passwordField = findByComponent("Input", wrapper).at(1);
        passwordField
          .dive()
          .simulate("change", { target: { name: "Password", value: "spam" } });

        //? Finally submitting the form
        form.simulate("submit", { preventDefault: jest.fn() });

        //? This will execute async function in login.js immidiately
        await new Promise((res) => setImmediate(res));

        expect(jwt.default.sign.mock.calls.length).toBe(0);
        expect(router.default.push.mock.calls.length).toBe(0);
      });
    });
  });

  describe("Redirecting", () => {
    it("Should redirect to registration page", () => {
      const button = findByDataTest("to-register-button", wrapper);
      expect(button.length).toBe(1);

      button.dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
    it("Should redirect to facebook.com", () => {
      const button = findByDataTest("facebook-button", wrapper);
      expect(button.length).toBe(1);

      button.dive().simulate("click");
      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });
});
