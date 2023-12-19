import { configureStore } from "@reduxjs/toolkit";
import { salesSlice } from "./SalesSlice";
import { authSlice } from "./auth";


export const store = configureStore({
  reducer: {
    sales: salesSlice.reducer,
    auth: authSlice.reducer,
 
  },
});
