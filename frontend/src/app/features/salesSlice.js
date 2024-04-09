import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../config/instance.js";
import { sales } from "../../dummydatas/sold.js";

// utilities
import {
  getPastWeek,
  getCurrentDate,
  formatDateToYYYYMMDD,
  isDateInLastMonth,
  getCurrentYear,
  getMonthNameAndYear,
  getMondayAndSunday,
  getDayOfWeek,
  getMonthAndYear,
  replaceDashWithHypen,
} from "../../utilities/dates.js";
import { formatNumberWithCommas } from "../../utilities/number.js";
import { throwError } from "../../utilities/error.js";

const initialState = {
  // filter the sales in the backend to only send sold products that matches the filter (this weeek, month, year)
  // by default fetch the sales having th filteras the paramter to only return related data
  soldProducts: [],
  totalSales: 0,
  filter: "today", // week, now, month
  chartData: [],
  chartFilterSales: "this week", //this week || this year

  // fetch best selling from the database that matches the month and year paramter like the month and year today
  bestSelling: [],
};

// async function here
export const fetchAllSales = createAsyncThunk("/sales", async () => {
  try {
    const response = await instance.get("/sales");
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

export const walkInOrder = createAsyncThunk(
  "/sales/walkin/order",
  async (data) => {
    try {
      const response = await instance.post("/sales/walkin/order", data);
      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
);

export const salesSlce = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setChartFilterSales: (state, action) => {
      state.chartFilterSales = action.payload;
    },
    setTotalSales: (state) => {
      // reset the sales
      state.totalSales = 0;
      if (state.filter === "week") {
        const currentDate = formatDateToYYYYMMDD(getCurrentDate());
        const weekPastNow = formatDateToYYYYMMDD(getPastWeek());
        state.soldProducts.forEach((product) => {
          const dateSold = replaceDashWithHypen(product.createdAt);

          if (dateSold >= weekPastNow && dateSold < currentDate) {
            state.totalSales += product.sub_total;
          }
        });

        state.totalSales = formatNumberWithCommas(state.totalSales);
      } else if (state.filter === "month") {
        state.soldProducts.forEach((product) => {
          const soldDate = replaceDashWithHypen(product.createdAt);
          if (isDateInLastMonth(soldDate)) {
            state.totalSales += product.sub_total;
          }
        });
        state.totalSales = formatNumberWithCommas(state.totalSales);
      } else if (state.filter === "today") {
        const currentDate = formatDateToYYYYMMDD(getCurrentDate());
        state.soldProducts.forEach((product) => {
          if (currentDate == replaceDashWithHypen(product.createdAt)) {
            state.totalSales += product.sub_total;
          }
        });
        state.totalSales = formatNumberWithCommas(state.totalSales);
      }
    },

    setChartSummarySales: (state) => {
      const thisYear = getCurrentYear();
      if (state.chartFilterSales == "this year") {
        const salesEachMonth = [
          { month: "January", sales: 0 },
          { month: "February", sales: 0 },
          { month: "March", sales: 0 },
          { month: "April", sales: 0 },
          { month: "May", sales: 0 },
          { month: "June", sales: 0 },
          { month: "July", sales: 0 },
          { month: "August", sales: 0 },
          { month: "September", sales: 0 },
          { month: "October", sales: 0 },
          { month: "November", sales: 0 },
          { month: "December", sales: 0 },
        ];
        const thisYearSales = state.soldProducts.filter((prod) => {
          const { month, year } = getMonthNameAndYear(prod.createdAt);
          if (year != thisYear) return;

          // only return the sales thats been sold during the rpesent year
          return prod;
        });
        thisYearSales.forEach((sale) => {
          salesEachMonth.forEach((month) => {
            const saleMonth = getMonthNameAndYear(sale.createdAt).month;
            if (month.month == saleMonth) {
              month.sales += sale.sub_total;
            }
          });
        });

        state.chartData = salesEachMonth;
      } else if (state.chartFilterSales == "this week") {
        const salesEachDay = [
          { day: "Monday", sales: 0 },
          { day: "Tuesday", sales: 0 },
          { day: "Wednesday", sales: 0 },
          { day: "Thursday", sales: 0 },
          { day: "Friday", sales: 0 },
          { day: "Saturday", sales: 0 },
          { day: "Sunday", sales: 0 },
        ];

        const thisWeekSales = state.soldProducts.filter((prod) => {
          const { lastMonday, nextSunday } = getMondayAndSunday();

          const date = replaceDashWithHypen(prod.createdAt);
          if (lastMonday <= date && nextSunday >= date) {
            return prod;
          }
        });
        thisWeekSales.forEach((sale) => {
          salesEachDay.forEach((day) => {
            const dayOfWeek = getDayOfWeek(
              replaceDashWithHypen(sale.createdAt)
            );
            if (dayOfWeek == day.day) {
              day.sales += sale.sub_total;
            }
          });
        });
        state.chartData = salesEachDay;
      }
    },

    setBestSelling: (state) => {
      const thisMonthAndYear = getMonthAndYear(state.bestSellingFilter);
      const soldThisMonthAndYear = state.soldProducts.filter((prod) => {
        const { month, year } = getMonthAndYear(
          replaceDashWithHypen(prod.createdAt)
        );

        return (
          year === thisMonthAndYear.year && month === thisMonthAndYear.month
        );
      });

      let bestSellerContainer = [];

      soldThisMonthAndYear.forEach((item) => {
        const itemIndex = bestSellerContainer.findIndex(
          (prodIndex) => prodIndex.product_name === item.product_name
        );

        if (itemIndex !== -1) {
          item.colors.forEach((color) => {
            color.sizes.forEach((size) => {
              bestSellerContainer[itemIndex].quantity += size.quantity;
            });
          });
        } else {
          let qty = 0;
          item.colors.forEach((color) => {
            color.sizes.forEach((size) => {
              qty += parseInt(size.quantity);
            });
          });
          const data = { product_name: item.product_name, quantity: qty };
          bestSellerContainer.push(data);
        }

        const sortedBestSellingArr = bestSellerContainer.sort(
          (a, b) => b.quantity - a.quantity
        );

        if (sortedBestSellingArr.length > 5) {
          sortedBestSellingArr.slice(0, 5);
        }

        state.bestSelling = sortedBestSellingArr;
      });
    },

    setBestSellingFilter: (state, action) => {
      state.bestSellingFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSales.fulfilled, (state, action) => {
        state.soldProducts = action.payload.data;
      })
      .addCase(fetchAllSales.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});
export const {
  setTotalSales,
  setFilter,
  setChartSummarySales,
  setChartFilterSales,
  setBestSelling,
  setBestSellingFilter,
} = salesSlce.actions;
export default salesSlce.reducer;
