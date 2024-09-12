import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Feature/Slices/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
