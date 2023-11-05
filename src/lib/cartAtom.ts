import { atom } from "jotai";
import { MealItem } from "./types";

const initialState: {
  items: Array<MealItem>;
} = {
  items: [],
};
export const cartAtom = atom(initialState);
