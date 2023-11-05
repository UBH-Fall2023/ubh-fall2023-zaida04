import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MealItem } from "./types";

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

type Store = {
  src: string;
  id: string;
  label: string;
  description: string;
  dishTypes: Array<{ value: string; emoji: string }>;
  items: Array<Omit<MealItem, "dateAdded" | "checkoutId">>;
  meta?: any;
};

export const popularStores: Array<Store> = [
  {
    label: "Tim Horton's",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4C0IiAEY-d0P197JeqM25tRkN0wBn-g__XdqC2c6GFrJLp1sh_57myS59r88osFf_pno&usqp=CAU",
    id: "tim-horton",
    dishTypes: [
      {
        value: "meals",
        emoji: "🍖",
      },
      {
        value: "beverages",
        emoji: "🍹",
      },
      {
        value: "sweets",
        emoji: "🧁",
      },
    ],
    items: [
      {
        dishType: "meals",
        name: "Something 2",
        src: "https://www.snackandbakery.com/ext/resources/New-Consumer-Products/TIM-HORTONS-MAPLE-WAFFLE-BREAKFAST-SANDWICH-(1).jpg?1662566263",
        description: "A great piece of food",
        price: 100,
        rating: 5,
        restaurantId: "tim-horton",
        id: crypto.randomUUID(),
      },
      {
        dishType: "meals",
        name: "Something 1",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3HgCoVSEsPgvFcQt6eNs2ZEgLjRVwwtpzyP2fmFPUy57Mo_3xWFCgq9t7L0t97-oMvY&usqp=CAU",
        description: "mmmhmm yummy",
        price: 100,
        rating: 4,
        restaurantId: "tim-horton",
        id: crypto.randomUUID(),
      },
    ],
    description:
      "Tim Hortons Inc. is a Canadian multinational fast food restaurant chain. Based in Toronto, Tim Hortons serves coffee, doughnuts and other fast food items.",
  },
  // do the same for a bunch of resturaraunts
  {
    label: "McDonald's",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    id: "mcdonalds",
    dishTypes: [
      {
        value: "mcdonalds",
        emoji: "🍖",
      },
      {
        value: "mcdonalds1",
        emoji: "🍹",
      },
      {
        value: "mcdonalds2",
        emoji: "🧁",
      },
    ],
    items: [
      {
        dishType: "mcdonalds1",
        name: "Something 3",
        description: "some junk food",
        price: 100,
        rating: 3,
        restaurantId: "tim-horton",
        id: crypto.randomUUID(),
      },
      {
        dishType: "mcdonalds2",
        name: "Something 4",
        description: "moar junk food",
        price: 100,
        rating: 5,
        restaurantId: "mcdonalds2",
        id: crypto.randomUUID(),
      },
    ],
    description:
      "McDonald's Corporation is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States.",
  },
  {
    label: "Burger King",
    src: "data:image/png;base64,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",
    id: "burger-king",
    dishTypes: [
      { value: "burger-king", emoji: "🍖" },
      { value: "burger-king1", emoji: "🍹" },
    ],
    items: [
      {
        dishType: "burger-king",
        description: "burgey kings meal",
        name: "Something 1afasdf",
        price: 100,
        rating: 3,
        restaurantId: "burger-king",
        id: crypto.randomUUID(),
      },
      {
        dishType: "burger-king3",
        description: "another burg king meal",
        name: "Something fdasfsadf",
        price: 100,
        rating: 3,
        restaurantId: "burger-king",
        id: crypto.randomUUID(),
      },
    ],
    description:
      "Burger King is an American multinational chain of hamburger fast food restaurants. Headquartered in Miami-Dade County, Florida, the company was founded in 1953 as Insta-Burger King, a Jacksonville, Florida–based restaurant chain.",
  },
  {
    label: "Moe's",
    src: "data:image/png;base64,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",
    id: "moes",
    dishTypes: [
      { value: "moes", emoji: "🍖" },
      { value: "moes1", emoji: "🍹" },
      { value: "moes2", emoji: "🍹" },
    ],
    items: [
      {
        dishType: "moes1",
        description: "the best meal of all time",
        name: "Something 5",
        price: 100,
        rating: 2,
        restaurantId: "moes",
        id: crypto.randomUUID(),
      },
      {
        dishType: "moes3",
        description: "any oddly salty meal",
        name: "Something 6",
        price: 100,
        rating: 1,
        restaurantId: "moes",
        id: crypto.randomUUID(),
      },
    ],
    description:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F8%2F80%2FMoes_logo.png&tbnid=KQSVX1gYLcvIiM&vet=12ahUKEwiQzYOE_6qCAxWaMFkFHYZnCgYQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMoe%2527s_Southwest_Grill&docid=9nvrR9H_tpN7UM&w=169&h=169&q=moes&ved=2ahUKEwiQzYOE_6qCAxWaMFkFHYZnCgYQMygAegQIARB0",
  },
  {
    label: "Burger King 2",
    src: "data:image/png;base64,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",
    id: "burger-king-squared",
    dishTypes: [
      // { value: "burger-king" },
      // { value: "burger-king1" },
      // { value: "burger-king2" },
      // { value: "burger-king2" },
    ],
    items: [
      {
        dishType: "burger-king",
        description: "not gonna dedup this lul",
        name: "Something 7",
        price: 100,
        rating: 1,
        restaurantId: "burger-king-squared",
        id: crypto.randomUUID(),
      },
      {
        dishType: "burger-king3",
        description: "ahhhhhhhhhhhhhhhhhh",
        name: "Something 8",
        price: 100,
        rating: 1,
        restaurantId: "burger-king-squared",
        id: crypto.randomUUID(),
      },
    ],
    description:
      "Burger King is an American multinational chain of hamburger fast food restaurants. Headquartered in Miami-Dade County, Florida, the company was founded in 1953 as Insta-Burger King, a Jacksonville, Florida–based restaurant chain.",
  },
];
