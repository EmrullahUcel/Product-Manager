import { createSlice } from "@reduxjs/toolkit";
import { productsList } from "../components/productsList";

const initialState = {
  total: 0,
  barcode: "",
  product: productsList,
  receipt: [],
  selectedProducts: [],
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    selling: (state, action) => {
      state.total = action.payload;
      state.receipt = [
        {
          products: state.selectedProducts,
          total: state.total,
        },
      ];
      state.selectedProducts = [];
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;
      const findBarcode = state.product.find(
        (product) => product.barcode === action.payload
      );
      if (findBarcode) {
        const existingProduct = state.selectedProducts.find(
          (product) => product.id === findBarcode.id
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.selectedProducts.push({ ...findBarcode, quantity: 1 });
        }
      }
    },
    selectProduct: (state, action) => {
      const existingProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      const updatedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload.id
      );

      return {
        ...state,
        selectedProducts: updatedProducts,
      };
    },
    clearProducts: (state) => {
      state.selectedProducts = [];
    },

    increase: (state, action) => {
      const existingProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    decrease: (state, action) => {
      const existingProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          const updatedProducts = state.selectedProducts.filter(
            (product) => product.id !== action.payload.id
          );

          return {
            ...state,
            selectedProducts: updatedProducts,
          };
        }
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

export default salesSlice.reducer;
export const {
  increase,
  selling,
  setBarcode,
  clearProducts,
  decrease,
  deleteProduct,
  selectProduct,
} = salesSlice.actions;
