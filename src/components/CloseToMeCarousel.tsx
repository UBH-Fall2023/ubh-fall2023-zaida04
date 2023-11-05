import { queryAtom } from "@/lib/queryAtom";
import { Store, cn, modifyQuery } from "@/lib/utils";
import { useAtom } from "jotai";

export const closeToMeStores: Array<Store> = [
  {
    label: "Local Diner",
    src: "https://example.com/images/local-diner.png",
    id: "local-diner",
    dishTypes: [
      { value: "local-meals", emoji: "🍖" },
      { value: "local-beverages", emoji: "🍹" },
      { value: "local-sweets", emoji: "🍰" },
    ],
    items: [
      {
        dishType: "local-meals",
        description: "Homemade comfort food",
        name: "Homestyle Pot Roast",
        price: 120,
        rating: 5,
        restaurantName: "local-diner",
        id: crypto.randomUUID(),
      },
      {
        dishType: "local-beverages",
        description: "Freshly brewed",
        name: "Local Coffee",
        price: 20,
        rating: 4,
        restaurantName: "local-diner",
        id: crypto.randomUUID(),
      },
      {
        dishType: "local-sweets",
        description: "Delicious and sweet",
        name: "Apple Pie",
        price: 50,
        rating: 5,
        restaurantName: "local-diner",
        id: crypto.randomUUID(),
      },
    ],
    description: "Local Diner serves classic comfort food with a homey feel.",
  },
  {
    label: "Neighborhood Café",
    src: "https://example.com/images/neighborhood-cafe.png",
    id: "neighborhood-cafe",
    dishTypes: [
      { value: "cafe-meals", emoji: "🥪" },
      { value: "cafe-beverages", emoji: "☕" },
      { value: "cafe-sweets", emoji: "🍪" },
    ],
    items: [
      {
        dishType: "cafe-meals",
        description: "Light and healthy",
        name: "Avocado Toast",
        price: 80,
        rating: 4,
        restaurantName: "neighborhood-cafe",
        id: crypto.randomUUID(),
      },
      {
        dishType: "cafe-beverages",
        description: "Refreshing",
        name: "Iced Latte",
        price: 30,
        rating: 5,
        restaurantName: "neighborhood-cafe",
        id: crypto.randomUUID(),
      },
      {
        dishType: "cafe-sweets",
        description: "Sweet treat",
        name: "Chocolate Chip Cookie",
        price: 25,
        rating: 4,
        restaurantName: "neighborhood-cafe",
        id: crypto.randomUUID(),
      },
    ],
    description:
      "Neighborhood Café offers cozy ambiance with freshly made delicacies.",
  },
];

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Stars from "./Stars";

type Props = {};

export default function CloseToMeCarousel({}: Props) {
  const [query, setQuery] = useAtom(queryAtom);
  return (
    <div className="flex h-fit py-4 gap-x-6 overflow-x-scroll px-6 border-y-2">
      {closeToMeStores.map((store) => (
        <Button
          onClick={() => {
            const firstType = store.dishTypes.at(0)?.value;
            if (!firstType) return;

            const currentStore = query.searchParams?.get("store");
            if (currentStore) {
              modifyQuery(setQuery, [["type", firstType]]);
              return;
            }

            modifyQuery(setQuery, [
              ["store", store.id],
              ["type", firstType],
            ]);
          }}
          className={cn([
            " flex hover:bg-secondary text-primary p-0 flex-col justify-around items-stretch gap-x-2 h-fit min-w-[16rem] border bg-white",
            query.searchParams?.get("store") === store.id
              ? "hover:bg-secondary shadow-sm scale-[1.03] transition shadow-primary"
              : "",
          ])}
        >
          <div className="flex h-3/4 w-full">
            <div className="w-full h-full">
              <Image
                alt="Dish image"
                className="rounded-lg object-cover w-full h-32"
                height="200"
                src={store.src}
                width="200"
              />
            </div>
          </div>
          <div className="w-full justify-center h-full flex">
            <h3 className="font-semibold tracking-tight mt-2">{store.label}</h3>
          </div>
          <div className="flex h-1/4 w-full items-center justify-around p-3">
            <Stars starFill={[true, true, true, false]} />
          </div>
        </Button>
      ))}
    </div>
  );
}
