import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (http, thunkApi) => {
    const { data } = await axios.get(http);
    return data;
  }
);

export const fetchOnePizza = createAsyncThunk(
  "pizza/fetchOnePizza",
  async (http) => {
    const { data } = await axios.get(http);

    return data;
  }
);

const initialState = {
  items: [],
  item: {},
  status: "loading",
  statusOne: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },

    [fetchOnePizza.pending]: (state) => {
      state.statusOne = "loading";
      state.item = {};
    },
    [fetchOnePizza.fulfilled]: (state, action) => {
      state.item = action.payload;
      state.statusOne = "success";
    },
    [fetchOnePizza.rejected]: (state) => {
      state.statusOne = "error";
      console.log("err");
      state.item = {};
    },
  },
});

export const selectPizzas = (state) => state.pizza;

export default pizzasSlice.reducer;
