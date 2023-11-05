import { atom } from "jotai";

type CartItem = {
  id: string;

  dateAdded: number;
};
const initialState: {
  items: Array<CartItem>;
} = {
  items: [],
};
export const cartAtom = atom(initialState);
