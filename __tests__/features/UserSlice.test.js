import { configureStore } from "@reduxjs/toolkit";

import UserSlice, {
  selectUser,
  selectUserError,
  selectUserLoading,
  logInUser,
  initUser,
  registerUser,
  logOutUser,
  updateUser,
  getUser,
} from "../../features/UserSlice/UserSlice";

describe("UserSlice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: UserSlice,
      },
    });
  });

  describe("Initial states", () => {
    it("Should select prop", () => {
      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });
  });

  describe("initUser", () => {
    it("Should init a user", () => {
      const userObject = { id: 1 };

      store.dispatch(initUser(userObject));

      const user = selectUser(store.getState());
      expect(typeof user).toBe("object");
    });
  });

  describe("logInUser", () => {
    const credentials = { username: "abdul", password: "Jafar129" };
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should log the user in", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => {
          return {};
        },
      });
      await store.dispatch(logInUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(typeof user).toBe("object");
    });

    it("Should set error to true when response.ok=false", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => undefined,
      });

      await store.dispatch(logInUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });

    it("Should set error to true when got rejected", async () => {
      // mocking fetch
      fetch.mockRejectedValueOnce({});

      await store.dispatch(logInUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });
  });

  describe("logInUser", () => {
    const credentials = { username: "abdul", password: "Jafar129" };
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should get the user ", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => {
          return {};
        },
      });
      await store.dispatch(getUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(typeof user).toBe("object");
    });

    it("Should set error to true when response.ok=false", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => undefined,
      });

      await store.dispatch(getUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });

    it("Should set error to true when got rejected", async () => {
      // mocking fetch
      fetch.mockRejectedValueOnce({});

      await store.dispatch(getUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });
  });

  describe("updateUser", () => {
    const credentials = { value: "Zakhar", field: "first_name", id: 200 };
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should update user info", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => {
          return {};
        },
      });
      await store.dispatch(updateUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(typeof user).toBe("object");
      expect(user[credentials.field]).toBe(credentials.value);
    });

    it("Should set error to true when response.ok=false", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => undefined,
      });

      await store.dispatch(updateUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });

    it("Should set error to true when got rejected", async () => {
      // mocking fetch
      fetch.mockRejectedValueOnce({});

      await store.dispatch(updateUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });
  });

  describe("logOutUser", () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should log the user out", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => {
          return {};
        },
      });
      await store.dispatch(logOutUser());

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });

    it("Should set error to true when response.ok=false", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => undefined,
      });

      await store.dispatch(logOutUser());

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });

    it("Should set error to true when got rejected", async () => {
      // mocking fetch
      fetch.mockRejectedValueOnce({});

      await store.dispatch(logOutUser());

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });
  });
  describe("registerUser", () => {
    const credentials = {
      username: "abdul",
      password: "Jafar122",
      email: "jafar@gmail.com",
      first_name: "Abdul",
      last_name: "Jafar",
    };

    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should register a new user", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => {
          return {};
        },
      });
      await store.dispatch(registerUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(typeof user).toBe("object");
    });

    it("Should set error to true when response.ok=false", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => undefined,
      });

      await store.dispatch(registerUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });

    it("Should set error to true when got rejected", async () => {
      // mocking fetch
      fetch.mockRejectedValueOnce({});

      await store.dispatch(registerUser(credentials));

      const error = selectUserError(store.getState());
      const loading = selectUserLoading(store.getState());
      const user = selectUser(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
      expect(user).toBe(null);
    });
  });
});
