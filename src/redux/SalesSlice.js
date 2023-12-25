import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  total: 0,
  barcode: "",
  productList: [],
  receipt: {
    user: null,
    receipts: [],
    totalSell: null,
  },
  selectedProducts: [],
  totalReceipts: [],
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.productList = action.payload;
    },
    setCheckSell: (state, action) => {
      state.totalReceipts = action.payload;
    },
    selling: (state, action) => {
      const { total, user } = action.payload;
      state.total = total;

      (state.receipt = {
        user: user,
        receipts: state.selectedProducts,
        total: state.total,
      }),
        (state.selectedProducts = []);
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;

      const findBarcode = state.productList.find(
        (product) => product.barcode === action.payload
      );
      if (findBarcode) {
        const existingProduct = state.selectedProducts.find(
          (product) => product.$id === findBarcode.$id
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
        (product) => product.$id === action.payload.$id
      );
        
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      const updatedProducts = state.selectedProducts.filter(
        (product) => product.$id !== action.payload.$id
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
        (product) => product.$id === action.payload.$id
      );
      if (existingProduct.stock > 1) {
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.selectedProducts.push({ ...action.payload, quantity: 1 });
        }
      }else{
        message.warning('ürün stockta yok !')
      }
    },
    decrease: (state, action) => {
      const existingProduct = state.selectedProducts.find(
        (product) => product.$id === action.payload.$id
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          const updatedProducts = state.selectedProducts.filter(
            (product) => product.$id !== action.payload.$id
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
  getData,
  setCheckSell,
} = salesSlice.actions;
