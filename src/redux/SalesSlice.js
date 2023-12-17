import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  selectedProducts: [],
  receipt: [],
  whoLogin: "",
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
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
    whoIsLogin: (state, action) => {
      state.whoLogin = action.payload;
    },
    increase:(state , action) =>{
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
    }
    
 
  },
});

export default salesSlice.reducer;
export const {
  deleteProduct,
  selectProduct,
  clearProducts,
  selling,
  whoIsLogin,
  login,
  decrease,
  increase
} = salesSlice.actions;
