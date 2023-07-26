export enum SortPropertyEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

export type SortItem = {
  title: string;
  sortType: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: SortPropertyEnum;
  sort: SortItem;
}
