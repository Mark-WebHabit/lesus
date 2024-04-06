import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../config/instance.js";
import { logs } from "../../dummydatas/userlogs.js";
import {
  getMonthAndYear,
  getMonthNameFromDate,
} from "../../utilities/dates.js";

const initialState = {
  // this shoudl be fetched in the db
  userlogs: logs,
  filter: "2024",
  engagementChart: [],
};

export const userlogsSlice = createSlice({
  name: "userlogs",
  initialState,
  reducers: {
    setEngagementChart: (state) => {
      const dataEngagament = [
        { month: "January", engagements: [] },
        { month: "February", engagements: [] },
        { month: "March", engagements: [] },
        { month: "April", engagements: [] },
        { month: "May", engagements: [] },
        { month: "June", engagements: [] },
        { month: "July", engagements: [] },
        { month: "August", engagements: [] },
        { month: "September", engagements: [] },
        { month: "October", engagements: [] },
        { month: "November", engagements: [] },
        { month: "December", engagements: [] },
      ];
      const logsWithinFIlterYear = state.userlogs.filter((log) => {
        const year = getMonthAndYear(log.created_at).year;
        return year == state.filter;
      });

      logsWithinFIlterYear.forEach((log) => {
        dataEngagament.forEach((data) => {
          const month = getMonthNameFromDate(log.created_at);

          if (month == data.month) {
            data.engagements.push(log._id);
          }
        });
      });

      state.engagementChart = dataEngagament;
    },
    setFilterUserlogs: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setEngagementChart, setFilterUserlogs } = userlogsSlice.actions;
export default userlogsSlice.reducer;
