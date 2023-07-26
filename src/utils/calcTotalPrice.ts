import { _CartItem } from "../redux/slices/cart/types";

export const calcTotalPrice = (items: _CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
