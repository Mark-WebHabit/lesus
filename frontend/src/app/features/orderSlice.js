import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../config/instance.js";
import { orders } from "../../dummydatas/orders.js";
import { getPercent } from "../../utilities/number.js";

const initialState = {
  //fetch all the sproducts
  orders: orders,
  totalOrders: 0,
  filter: "all", // week, now, month
  pieData: [
    { status: "pending", count: 0 },
    { status: "completed", count: 0 },
    { status: "cancelled", count: 0 },
  ],
};

// asyn functions here
export const fetchAllOrders = createAsyncThunk("/orders", async () => {
  try {
    const response = await instance.get("/orders");

    return response.data;
  } catch (error) {
    if (error.response?.data) {
      console.log(error.response.data);
      throw new Error(error.response.data);
    } else {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
});

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTotalTransactions: (state) => {
      state.totalOrders = 0;
      if (state.filter === "all") {
        state.totalOrders = state.orders.length;
      } else if (state.filter === "pending") {
        const pending = state.orders.filter((order) => {
          if (order.status === "pending") {
            return order;
          }
        });

        state.totalOrders = pending.length;
      } else if (state.filter === "completed") {
        const completed = state.orders.filter((order) => {
          if (order.status === "completed") {
            return order;
          }
        });

        state.totalOrders = completed.length;
      } else if (state.filter === "cancelled") {
        const cancelled = state.orders.filter((order) => {
          if (order.status === "cancelled") {
            return order;
          }
        });

        state.totalOrders = cancelled.length;
      }
    },
    setPieChartData: (state) => {
      const pending = state.orders.filter((order) => {
        return order.status === "pending";
      });
      const completed = state.orders.filter((order) => {
        return order.status === "completed";
      });
      const cancelled = state.orders.filter((order) => {
        return order.status === "cancelled";
      });

      const pendingInPercent = getPercent(pending.length, state.orders.length);
      const completedInPercent = getPercent(
        completed.length,
        state.orders.length
      );
      const cancelledInPercent = getPercent(
        cancelled.length,
        state.orders.length
      );

      state.pieData = [
        { status: "pending", count: pendingInPercent },
        { status: "completed", count: completedInPercent },
        { status: "cancelled", count: cancelledInPercent },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});
export const { setTotalTransactions, setOrdersFilter, setPieChartData } =
  orderSlice.actions;
export default orderSlice.reducer;
