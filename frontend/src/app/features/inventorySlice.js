import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../config/instance.js";
import { products } from "../../dummydatas/products.js";

const initialState = {
  //fetch all the sproducts
  products: products,
  totalStocks: 0,
  criticalItems: [],
  //   filter: "today", // week, now, month
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setTotalInventory: (state) => {
      state.totalStocks = 0;
      if (state.products && state.products.length) {
        state.totalStocks = state.products.length;
      } else {
        state.totalStocks = 0;
      }
    },
    setCriticalItemsm: (state) => {
      const container = [];
      state.products.forEach((product) => {
        const isExisiting = container.find(
          (item) => item.product_name === product.product_name
        );

        if (isExisiting) {
          isExisiting.quantity += 1;
        } else {
          container.push({ product_name: product.product_name, quantity: 1 });
        }
      });
      const criticalContainer = container.filter((crit) => {
        // change this depending on the consideraiono f low quantity number
        if (crit.quantity <= 3) {
          return crit;
        }
      });
      state.criticalItems = criticalContainer;
    },
  },
});
export const { setTotalInventory, setCriticalItemsm } = inventorySlice.actions;
export default inventorySlice.reducer;
