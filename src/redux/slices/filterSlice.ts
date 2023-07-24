import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


export type SortItem = {
  title: string,
  sort: 'rating' | 'price' | 'title',
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: SortItem;
}

const initialState: FilterSliceState = {
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
    setSearchValue: (filter, actions: PayloadAction<string>) => {
      filter.searchValue = actions.payload;
    },
    setSelectedId: (filter, actions: PayloadAction<number>) => {
      filter.categoryId = actions.payload;
    },
    setSelectedSort: (filter, actions: PayloadAction<SortItem>) => {
      filter.sortType = actions.payload;
    },
    setSelectedPage: (filter, actions: PayloadAction<number>) => {
      filter.currentPage = actions.payload;
    },
    setFilters: (filter, actions: PayloadAction<FilterSliceState>) => {
      filter.categoryId = Number(actions.payload.categoryId)
      filter.sortType = actions.payload.sortType
      filter.currentPage = Number(actions.payload.currentPage)
    }
  },
});

export const selectFilter = (state: RootState) => state.filter
export const selectCategoryId = (state: RootState) => state.filter.categoryId
export const selectSortType = (state: RootState) => state.filter.sortType

export const { setSelectedId, setSelectedSort, setSelectedPage, setSearchValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
