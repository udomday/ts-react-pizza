import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter/slice";
import cartReducer from "./slices/cart/slice";
import pizzasReducer from "./slices/pizzas/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
