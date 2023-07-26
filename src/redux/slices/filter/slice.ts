import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, SortItem, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortType: SortPropertyEnum.RATING,
  sort: {
    title: "популярности",
    sortType: SortPropertyEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (filter, actions: PayloadAction<string>) => {
      filter.searchValue = actions.payload;
    },
    setSelectedId: (filter, actions: PayloadAction<number>) => {
      filter.categoryId = actions.payload;
    },
    setSelectedSort: (filter, actions: PayloadAction<SortItem>) => {
      filter.sort = actions.payload;
    },
    setSelectedPage: (filter, actions: PayloadAction<number>) => {
      filter.currentPage = actions.payload;
    },
    setFilters: (filter, actions: PayloadAction<FilterSliceState>) => {
      filter.categoryId = Number(actions.payload.categoryId);
      filter.sort = actions.payload.sort;
      filter.currentPage = Number(actions.payload.currentPage);
    },
  },
});

export const {
  setSelectedId,
  setSelectedSort,
  setSelectedPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
