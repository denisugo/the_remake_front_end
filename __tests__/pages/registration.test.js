import * as router from "next/router";
import * as jwt from "jsonwebtoken";

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
    //* Reset fetch mock
    fetch.resetMocks();

    //* jwt setup
    jwt.default.sign = jest.fn();

    //*  Next.js router setup
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
    //! Unable to test sumbitting after button clicking
    describe("All fields are filled out", () => {
      it("Should register a new user", async () => {
        //? Mocking fetch
        fetch.mockResolvedValueOnce({
          ok: true,
          json: () => {
            return {};
          },
        });

        //* Locate form component
        const form = findByComponent("form", wrapper);
        expect(form.length).toBe(1);

        //* Locate all fields and fill them out
        const firstNameField = findByDataTest("first-name", wrapper).at(0);
        firstNameField.dive().simulate("change", {
          target: { name: "First Name", value: "spam" },
        });

        const lastNameField = findByDataTest("last-name", wrapper).at(0);
        lastNameField
          .dive()
          .simulate("change", { target: { name: "Last Name", value: "spam" } });

        const emailField = findByDataTest("email", wrapper).at(0);
        emailField
          .dive()
          .simulate("change", { target: { name: "Email", value: "spam" } });

        const usernameField = findByDataTest("username", wrapper).at(0);
        usernameField.dive().simulate("change", {
          target: { name: "Username", value: "spam" },
        });

        const passwordField = findByDataTest("password", wrapper).at(0);
        passwordField
          .dive()
          .simulate("change", { target: { name: "Password", value: "spam" } });

        //* Submit form
        form.simulate("submit", { preventDefault: jest.fn() });

        //? This will execute async function in registration.js immidiately
        await new Promise((res) => setImmediate(res));

        expect(router.default.push.mock.calls.length).toBe(1);
      });
    });
  });
});
