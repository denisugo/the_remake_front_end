import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { endpoints } from "../../config/constants";

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async ({ username, password }) => {
    const body = `${"username"}=${encodeURIComponent(
      username
    )}&${"password"}=${encodeURIComponent(password)}`;

    const url = `${process.env.HOST}${endpoints.login()}`;

    const fetchedUser = await fetch(url, {
      method: "POST",
      credentials: "include",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    if (!fetchedUser.ok) throw new Error("Rejected");

    const user = await fetchedUser.json();

    return user;
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (id = 3) => {
    const url = `${process.env.HOST}${endpoints.logout(id)}`;

    const fetched = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!fetched.ok) throw new Error("Rejected");

    return null;
  }
);

export const getUser = createAsyncThunk("user/getUser", async (cookie = "") => {
  const url = `${process.env.HOST}${endpoints.user("")}`;

  const fetched = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Cookie: cookie,
    },
  });

  if (!fetched.ok) throw new Error("Rejected");

  const user = await fetched.json();
  return user;
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, password, email, first_name, last_name }) => {
    const body = `${"username"}=${encodeURIComponent(
      username
    )}&${"password"}=${encodeURIComponent(
      password
    )}&${"email"}=${encodeURIComponent(
      email
    )}&${"first_name"}=${encodeURIComponent(
      first_name
    )}&${"last_name"}=${encodeURIComponent(last_name)}`;

    const url = `${process.env.HOST}${endpoints.register()}`;

    const fetchedUser = await fetch(url, {
      method: "POST",
      credentials: "include",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    if (!fetchedUser.ok) throw new Error("Rejected");

    const user = await fetchedUser.json();

    return user;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ field, value, id }) => {
    const body = `${"field"}=${encodeURIComponent(
      field
    )}&${"value"}=${encodeURIComponent(value)}`;

    const url = `${process.env.HOST}${endpoints.user(id)}`;

    const fetchedUser = await fetch(url, {
      method: "PUT",
      credentials: "include",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    if (!fetchedUser.ok) throw new Error("Rejected");

    return { [field]: value };
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    initUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE", state, action.payload);

      action.payload = { ...action.payload.user };

      if (action.payload.user === null) delete action.payload.user;
      if (action.payload.loading === false) delete action.payload.loading;
      if (action.payload.error === false) delete action.payload.error;
      return { ...state, ...action.payload };
    },

    // Get handler
    [getUser.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.user = null;
    },
    // Login handler
    [logInUser.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [logInUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
    [logInUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.user = null;
    },
    // Logout handler
    [logOutUser.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [logOutUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
    [logOutUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.user = null;
    },
    // Registration handler
    [registerUser.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.user = null;
    },
    // Update user handler
    [updateUser.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = { ...state.user, ...action.payload };
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserError = (state) => state.user.error;
export const selectUserLoading = (state) => state.user.loading;

export const { initUser } = UserSlice.actions;

export default UserSlice.reducer;
