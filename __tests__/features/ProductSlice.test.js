import ProductSlice, {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../features/ProductSlice/ProductSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("ProductSlice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: ProductSlice,
      },
    });
  });

  describe("Initial states", () => {
    it("Should select prop", () => {
      const error = selectProductsError(store.getState());
      const loading = selectProductsLoading(store.getState());
      const products = selectProducts(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(Array.isArray(products)).toBe(true);
    });
  });

  describe("fetchProducts", () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("Should fetch products", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => [{}, {}],
      });
      await store.dispatch(fetchProducts());

      const error = selectProductsError(store.getState());
      const loading = selectProductsLoading(store.getState());
      const products = selectProducts(store.getState());

      expect(error).toBe(false);
      expect(loading).toBe(false);
      expect(Array.isArray(products)).toBe(true);
      expect(typeof products[0]).toBe("object");
    });

    it("Should set error to true when response.ok=false", async () => {
      // mocking fetch
      fetch.mockResolvedValueOnce({
        ok: false,
        json: () => [{}, {}],
      });

      await store.dispatch(fetchProducts());

      const error = selectProductsError(store.getState());
      const loading = selectProductsLoading(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
    });

    it("Should set error to true when got rejected", async () => {
      // mocking fetch
      fetch.mockRejectedValueOnce({});

      await store.dispatch(fetchProducts());

      const error = selectProductsError(store.getState());
      const loading = selectProductsLoading(store.getState());

      expect(error).toBe(true);
      expect(loading).toBe(false);
    });
  });
});
