import * as router from "next/router";

import * as jwt from "jsonwebtoken";

import user from "../../../pages/user";
import {
  findByDataTest,
  setUp,
  findByComponent,
} from "../../../utils/testUtils.js";

describe("User page", () => {
  let wrapper;

  const userObject = {
    username: "jafar",
    password: "secret01",
    email: "jafar@gmail.com",
    first_name: "Abdul",
    last_name: "Jafar",
  };

  beforeEach(() => {
    //* Reset fetch mock
    fetch.resetMocks();

    //* jwt setup
    jwt.default.sign = jest.fn();

    //* Mock alert
    global.alert = jest.fn();

    //*  Next.js router setup
    router.default.push = jest.fn();

    //* Wrap it!
    //wrapper = setUp(user, { user: userObject }).first().dive();
    wrapper = setUp(user, { user: userObject });
    wrapper = findByComponent("UserDesktop", wrapper).first().dive();
  });

  describe("Rendering", () => {
    it("Should render 6 buttons", () => {
      const buttons = findByComponent("Button", wrapper);
      expect(buttons.length).toBe(6);
    });
    it("Should render 5 detail items", () => {
      const items = findByComponent("p", wrapper);
      expect(items.length).toBe(5);
    });
    it("Should render correct username", () => {
      const username = findByDataTest("username", wrapper);
      expect(username.text()).toBe(userObject.username);
      expect(router.default.push.mock.calls.length).toBe(0);
    });
  });
  describe("Logout", () => {
    it("Should redirect to login", async () => {
      wrapper = setUp(user, { user: userObject });
      wrapper = findByComponent("UserDesktop", wrapper).first().dive();

      //* Locate butto nand click it
      const button = findByDataTest("logout", wrapper).at(0);
      button.dive().simulate("click");

      //? This will execute async function in login.js immidiately
      await new Promise((res) => setImmediate(res));

      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });
  describe("Edit box", () => {
    it("Should show editbox", () => {
      //! If wrapper.update() function will be used, it is important to have a pure wrapper value
      //? Not setUp(user).first().dive()
      wrapper = setUp(user, { user: userObject });
      const usernameButton = findByDataTest(
        "username-button",
        findByComponent("UserDesktop", wrapper).first().dive()
      ).at(0);

      //? Simulating button click
      usernameButton.dive().simulate("click");

      //? Updating UI, so now it renders editbox
      wrapper.update();

      let editBox = findByDataTest(
        "edit-box",
        findByComponent("UserDesktop", wrapper).first().dive()
      );
      expect(editBox.length).toBe(1);

      const cancel = findByDataTest(
        "cancel",
        findByComponent("UserDesktop", wrapper).first().dive()
      ).at(0);
      //? Simulating button click
      cancel.dive().simulate("click");

      //? Updating UI, so now it doesn't render editbox
      wrapper.update();

      editBox = findByDataTest(
        "edit-box",
        findByComponent("UserDesktop", wrapper).first().dive()
      );
      expect(editBox.length).toBe(0);
    });

    it("Should update user info when server sends status 200", async () => {
      //? Mocking fetch
      //? json() can return anything
      //? Only ok value is checked
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [],
      });
      wrapper = setUp(user, { user: userObject });
      const usernameButton = findByDataTest(
        "username-button",
        findByComponent("UserDesktop", wrapper).first().dive()
      ).at(0);

      //? Simulating button click
      usernameButton.dive().simulate("click");

      //? Updating UI, so now it  renders editbox
      wrapper.update();

      const input = findByComponent(
        "Input",
        findByComponent("UserDesktop", wrapper).first().dive()
      );

      //? Setting up a new value
      input
        .dive()
        .simulate("change", { target: { name: "username", value: "spam" } });

      //? Submitting changes
      const accept = findByComponent(
        "form",
        findByComponent("UserDesktop", wrapper).first().dive()
      ).at(0);
      accept.simulate("submit", { preventDefault: jest.fn() });

      //? This will execute async function in user.js immidiately
      await new Promise((res) => setImmediate(res));

      expect(jwt.default.sign.mock.calls.length).toBe(1);
    });
    it("Should NOT update user info when server sends status 400", async () => {
      //? Mocking fetch
      //? json() can return anything
      //? Only ok value is checked
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => [],
      });
      wrapper = setUp(user, { user: userObject });
      const usernameButton = findByDataTest(
        "username-button",
        findByComponent("UserDesktop", wrapper).first().dive()
      ).at(0);

      //? Simulating button click
      usernameButton.dive().simulate("click");

      //? Updating UI, so now it  renders editbox
      wrapper.update();

      const input = findByComponent(
        "Input",
        findByComponent("UserDesktop", wrapper).first().dive()
      );

      //? Setting up a new value
      input
        .dive()
        .simulate("change", { target: { name: "username", value: "spam" } });

      //? Submitting changes
      const accept = findByComponent(
        "form",
        findByComponent("UserDesktop", wrapper).first().dive()
      ).at(0);
      accept.simulate("submit", { preventDefault: jest.fn() });

      //? This will execute async function in user.js immidiately
      await new Promise((res) => setImmediate(res));

      expect(jwt.default.sign.mock.calls.length).toBe(0);
    });
  });
});
