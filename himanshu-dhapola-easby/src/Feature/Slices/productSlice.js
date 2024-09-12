import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setLoading, setProduct } = productSlice.actions;
export default productSlice.reducer;
