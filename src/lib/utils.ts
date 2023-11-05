import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const modifyQuery = (
  setLoc: (...args: any[]) => void,
  newQuery:
    | string
    | Record<string, string>
    | URLSearchParams
    | string[][]
    | undefined,
) => {
  setLoc((prev: any) => ({
    ...prev,
    searchParams: new URLSearchParams(newQuery),
  }));
};

export const run = <T>(f: () => T) => f();
