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
} from "../../utilities/dates.js";
import { formatNumberWithCommas } from "../../utilities/number.js";

const initialState = {
  // filter the sales in the backend to only send sold products that matches the filter (this weeek, month, year)
  // by default fetch the sales having th filteras the paramter to only return related data
  soldProducts: sales,
  totalSales: 0,
  filter: "today", // week, now, month
  chartData: [],
  chartFilterSales: "this week", //this week || this year

  // fetch best selling from the database that matches the month and year paramter like the month and year today
  bestSellingFilter: "new Date()",
  bestSelling: [],
};

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
          const dateSold = formatDateToYYYYMMDD(product.dateSold);

          if (dateSold >= weekPastNow && dateSold <= currentDate) {
            state.totalSales += product.price;
          }
        });

        state.totalSales = formatNumberWithCommas(state.totalSales);
      } else if (state.filter === "month") {
        state.soldProducts.forEach((product) => {
          const soldDate = formatDateToYYYYMMDD(product.dateSold);

          if (isDateInLastMonth(soldDate)) {
            state.totalSales += product.price;
          }
        });
        state.totalSales = formatNumberWithCommas(state.totalSales);
      } else if (state.filter === "today") {
        const currentDate = formatDateToYYYYMMDD(getCurrentDate());

        state.soldProducts.forEach((product) => {
          if (currentDate == formatDateToYYYYMMDD(product.dateSold)) {
            state.totalSales += product.price;
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
          const { month, year } = getMonthNameAndYear(prod.dateSold);
          if (year != thisYear) return;

          // only return the sales thats been sold during the rpesent year
          return prod;
        });

        thisYearSales.forEach((sale) => {
          salesEachMonth.forEach((month) => {
            const saleMonth = getMonthNameAndYear(sale.dateSold).month;
            if (month.month == saleMonth) {
              month.sales += sale.price;
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

          const date = formatDateToYYYYMMDD(prod.dateSold);
          if (lastMonday <= date && nextSunday >= date) {
            return prod;
          }
        });
        thisWeekSales.forEach((sale) => {
          salesEachDay.forEach((day) => {
            const dayOfWeek = getDayOfWeek(formatDateToYYYYMMDD(sale.dateSold));

            if (dayOfWeek == day.day) {
              day.sales += sale.price;
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
          formatDateToYYYYMMDD(prod.dateSold)
        );
        return (
          month === thisMonthAndYear.month && year === thisMonthAndYear.year
        );
      });

      const productQuantities = soldThisMonthAndYear.reduce((acc, prod) => {
        const existingProd = acc.find(
          (p) => p.product_name === prod.product_name
        );
        if (existingProd) {
          existingProd.quantity += 1;
        } else {
          acc.push({ product_name: prod.product_name, quantity: 1 });
        }
        return acc;
      }, []);

      // Sort the aggregated results by quantity in descending order
      const sortedProductQuantities = productQuantities.sort(
        (a, b) => b.quantity - a.quantity
      );
      // Assuming you want to update a state field with this sorted array
      state.bestSelling = sortedProductQuantities;
    },

    setBestSellingFilter: (state, action) => {
      state.bestSellingFilter = action.payload;
    },
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
