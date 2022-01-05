import * as reactRedux from "react-redux";
import * as UserSlice from "../../features/UserSlice/UserSlice";
import * as router from "next/router";
import React from "react";

import user from "../../pages/user";
import {
  findByTextChildren,
  findByDataTest,
  setUp,
  findByComponent,
} from "../../utils/testUtils.js";

describe("User page", () => {
  let dispatch;
  let wrapper;

  const userObject = {
    username: "jafar",
    password: "secret01",
    email: "jafar@gmail.com",
    first_name: "Abdul",
    last_name: "Jafar",
  };

  beforeEach(() => {
    //  Setup for react redux
    dispatch = jest.fn();

    reactRedux.useDispatch = jest.fn().mockReturnValue(dispatch);
    reactRedux.useSelector = jest.fn().mockReturnValue(userObject);

    UserSlice.selectUser = jest.fn();
    //   UserSlice.selectUserError = jest.fn();
    //   UserSlice.logInUser = jest.fn();

    //  Next.js router setup
    router.default.push = jest.fn();

    wrapper = setUp(user);
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
    it("Should redirect to login page when no user provided", () => {
      reactRedux.useSelector = jest.fn().mockReturnValue(null);
      UserSlice.selectUser = jest.fn();
      router.default.push = jest.fn();
      jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());
      wrapper = setUp(user);
      const username = findByDataTest("username", wrapper);
      expect(username.text()).toBe("");
      expect(reactRedux.useSelector.mock.calls.length).toBe(1);
      expect(router.default.push.mock.calls.length).toBe(1);
    });
  });
  describe("Logout", () => {
    it("Should redirect to login", () => {
      wrapper = setUp(user);
      const button = findByComponent("Button", wrapper).at(5);

      button.dive().simulate("click");

      expect(dispatch.mock.calls.length).toBe(1);
    });
  });
  describe("Edit box", () => {
    it("Should show editbox", () => {
      wrapper = setUp(user);
      const button = findByComponent("Button", wrapper).at(3); //username

      button.dive().simulate("click");
      //await new Promise(res=>setImmediate(res))
      wrapper.update();

      let editBox = findByDataTest("edit-box", wrapper);

      expect(editBox.length).toBe(1);

      const cancel = findByComponent("Button", wrapper).at(1);
      cancel.dive().simulate("click");

      wrapper.update();

      editBox = findByDataTest("edit-box", wrapper);

      expect(editBox.length).toBe(0);
    });
    it("Should update user info", () => {
      wrapper = setUp(user);
      const button = findByComponent("Button", wrapper).at(3); //username

      button.dive().simulate("click");

      wrapper.update();

      const input = findByComponent("Input", wrapper);

      input
        .dive()
        .simulate("change", { target: { name: "username", value: "spam" } });

      const accept = findByComponent("form", wrapper).at(0);
      accept.simulate("submit");
      expect(dispatch.mock.calls.length).toBe(1);
    });
  });
});
