import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.HOST;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (prop) => {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    throw new Error("Rejected");
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
      state.products = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.products = [];
    },
  },
});

export const selectProducts = (state) => state.products.products;
export const selectProductsError = (state) => state.products.error;
export const selectProductsLoading = (state) => state.products.loading;

export default ProductSlice.reducer;
