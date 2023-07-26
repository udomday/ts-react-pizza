import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, PizzaSliceState, Status } from "./types";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (http: string) => {
    const { data } = await axios.get<PizzaItem[]>(http);
    return data;
  }
);

export const fetchOnePizza = createAsyncThunk(
  "pizza/fetchOnePizza",
  async (http: string) => {
    const { data } = await axios.get<PizzaItem>(http);

    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  item: {},
  status: Status.LOADING,
  statusOne: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchPizzas
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    //fetchOnePizza
    builder.addCase(fetchOnePizza.pending, (state, action) => {
      state.statusOne = Status.LOADING;
      state.item = {};
    });

    builder.addCase(fetchOnePizza.fulfilled, (state, action) => {
      state.item = action.payload;
      state.statusOne = Status.SUCCESS;
    });

    builder.addCase(fetchOnePizza.rejected, (state, action) => {
      state.statusOne = Status.ERROR;
      state.item = {};
    });
  },
});

export default pizzasSlice.reducer;
