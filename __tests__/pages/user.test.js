import * as reactRedux from "react-redux";
import * as UserSlice from "../../features/UserSlice/UserSlice";
import * as router from "next/router";
import React from "react";
import * as jwt from "jsonwebtoken";

import user from "../../pages/user";
import {
  findByTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

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
    wrapper = setUp(user, { user: userObject });
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
      wrapper = setUp(user);
      const button = findByDataTest("logout", wrapper).at(0);

      //? Simulating button click
      button.dive().simulate("click");

      //? This will execute async function in login.js immidiately
      await new Promise((res) => setImmediate(res));

      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });
  describe("Edit box", () => {
    it("Should show editbox", () => {
      wrapper = setUp(user);
      const usernameButton = findByDataTest("username-button", wrapper).at(0);

      //? Simulating button click
      usernameButton.dive().simulate("click");

      //? Updating UI, so now it renders editbox
      wrapper.update();

      let editBox = findByDataTest("edit-box", wrapper);
      expect(editBox.length).toBe(1);

      const cancel = findByDataTest("cancel", wrapper).at(0);
      //? Simulating button click
      cancel.dive().simulate("click");

      //? Updating UI, so now it doesn't render editbox
      wrapper.update();

      editBox = findByDataTest("edit-box", wrapper);
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
      wrapper = setUp(user);
      const usernameButton = findByDataTest("username-button", wrapper).at(0);

      //? Simulating button click
      usernameButton.dive().simulate("click");

      //? Updating UI, so now it  renders editbox
      wrapper.update();

      const input = findByComponent("Input", wrapper);

      //? Setting up a new value
      input
        .dive()
        .simulate("change", { target: { name: "username", value: "spam" } });

      //? Submitting changes
      const accept = findByComponent("form", wrapper).at(0);
      accept.simulate("submit", { preventDefault: jest.fn() });

      //? This will execute async function in user.js immidiately
      await new Promise((res) => setImmediate(res));

      expect(jwt.default.sign.mock.calls.length).toBe(1);
    });
  });
  it("Should NOT update user info when server sends status 400", async () => {
    //? Mocking fetch
    //? json() can return anything
    //? Only ok value is checked
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => [],
    });
    wrapper = setUp(user);
    const usernameButton = findByDataTest("username-button", wrapper).at(0);

    //? Simulating button click
    usernameButton.dive().simulate("click");

    //? Updating UI, so now it  renders editbox
    wrapper.update();

    const input = findByComponent("Input", wrapper);

    //? Setting up a new value
    input
      .dive()
      .simulate("change", { target: { name: "username", value: "spam" } });

    //? Submitting changes
    const accept = findByComponent("form", wrapper).at(0);
    accept.simulate("submit", { preventDefault: jest.fn() });

    //? This will execute async function in user.js immidiately
    await new Promise((res) => setImmediate(res));

    expect(jwt.default.sign.mock.calls.length).toBe(0);
  });
});
