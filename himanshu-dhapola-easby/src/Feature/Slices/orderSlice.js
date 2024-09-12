import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  isLoading: false,
  orders: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export const { setOrders, setLoading, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
