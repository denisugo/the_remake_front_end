import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import ProductSlice from "../features/ProductSlice/ProductSlice";
import UserSlice from "../features/UserSlice/UserSlice";

// export const store = configureStore({
//   reducer: {
//     //products: ProductSlice,
//     user: UserSlice,
//   },
// });
const makeStore = () =>
  configureStore({
    reducer: {
      user: UserSlice,
    },
  });

export const wrapper = createWrapper(makeStore);
