import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../config/instance.js";

const initialState = {
  user: {},
  error: {},
};

export const getLoggedInUser = createAsyncThunk("/auth", async () => {
  try {
    const response = await instance.get("/auth");

    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.data);
    } else {
      throw new Error(error.message);
    }
  }
});

export const logout = createAsyncThunk("/auth/logout/userId", async (id) => {
  try {
    const response = await instance.get(`/auth/logout/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.data);
    } else {
      throw new Error(error.message);
    }
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
      });
  },
});

export default userSlice.reducer;
