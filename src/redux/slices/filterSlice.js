import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    title: "популярности",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (filter, actions) => {
      filter.searchValue = actions.payload;
    },
    setSelectedId: (filter, actions) => {
      filter.categoryId = actions.payload;
    },
    setSelectedSort: (filter, actions) => {
      filter.sortType = actions.payload;
    },
    setSelectedPage: (filter, actions) => {
      filter.currentPage = actions.payload;
    },
    setFilters: (filter, actions) => {
      filter.categoryId = Number(actions.payload.categoryId)
      filter.sortType = actions.payload.sortType
      filter.currentPage = Number(actions.payload.currentPage)
    }
  },
});

export const selectFilter = (state) => state.filter
export const selectCategoryId = (state) => state.filter.categoryId
export const selectSortType = (state) => state.filter.sortType

export const { setSelectedId, setSelectedSort, setSelectedPage, setFilter, setSearchValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
