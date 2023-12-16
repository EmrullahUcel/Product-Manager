import { configureStore } from "@reduxjs/toolkit";
import { salesSlice } from "./SalesSlice";

export const store = configureStore({
  reducer: {
    sales: salesSlice.reducer,
  },
});
