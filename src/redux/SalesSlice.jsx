import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  seletedProducts: [],
  receipt: [],
  isLogin: null,
  whoLogin: "",
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.seletedProducts = [...state.seletedProducts, action.payload];
    },
    deleteProcut: (state, action) => {
      const deleted = state.seletedProducts.filter(
        (product) => product.name !== action.payload.name
      );
      state.seletedProducts = deleted;
    },
    clearProducts: (state) => {
      state.seletedProducts = [];
    },
    selling: (state, action) => {
      state.total = action.payload;
      state.receipt = [
        {
          products: state.seletedProducts,
          total: state.total,
        },
      ];
      state.seletedProducts = [];
    },
    whoIsLogin: (state, action) => {
      state.whoLogin = action.payload;
    },
    login: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export default salesSlice.reducer;
export const {
  deleteProcut,
  selectProduct,
  clearProducts,
  selling,
  whoIsLogin,
  login
} = salesSlice.actions;
