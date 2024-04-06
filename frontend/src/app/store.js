import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice.js";
import salesReducer from "./features/salesSlice.js";
import inventoryReducer from "./features/inventorySlice.js";
import orderReducer from "./features/orderSlice.js";
import userlogsReducer from "./features/userlogSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sales: salesReducer,
    inventory: inventoryReducer,
    orders: orderReducer,
    userlogs: userlogsReducer,
  },
});
