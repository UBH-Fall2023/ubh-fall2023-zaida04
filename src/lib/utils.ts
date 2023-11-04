import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const modifyQuery = (
  setLoc: (...args: any[]) => void,
  newQuery: string[],
) => {
  setLoc((prev: any) => ({
    ...prev,
    searchParams: new URLSearchParams([newQuery]),
  }));
};
