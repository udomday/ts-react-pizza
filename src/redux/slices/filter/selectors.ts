import { RootState } from "../../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectCategoryId = (state: RootState) => state.filter.categoryId;
export const selectSortType = (state: RootState) => state.filter.sort;
