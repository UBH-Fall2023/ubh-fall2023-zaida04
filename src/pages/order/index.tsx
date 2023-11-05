import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/filters/ComboBox";
import { cn, modifyQuery, run, popularStores } from "@/lib/utils";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { atomWithLocation } from "jotai-location";
import Image from "next/image";
import { cartAtom } from "@/lib/cartAtom";
import { Slider } from "@/components/ui/slider";
import NavBar from "@/components/NavBar";
import Stars from "@/components/Stars";

import { MealItem } from "@/lib/types";
import RemoveCartItem from "@/components/RemoveCartItem";
import PopularCarousel from "@/components/PopularCarousel";
import { queryAtom } from "@/lib/queryAtom";
import CloseToMeCarousel from "@/components/CloseToMeCarousel";

type Props = {};

// const categories = {
//   "Speed ⚡": "speed",
// }
const categories = ["Speed 🏃‍♂️", "Most Popular 🎉", "On A Budget 🤑"];

type Store = {
  src: string;
  id: string;
  label: string;
  description: string;
  dishTypes: Array<{ value: string; emoji: string }>;
  items: Array<Omit<MealItem, "dateAdded" | "checkoutId">>;
  meta?: any;
};

export default function Index(props: Props) {
  const [query, setQuery] = useAtom(queryAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [searchItemsQuery, setSearchItemsQuery] = useState<string | null>(null);
  const [showChartCheckId, setShowCartCheckId] = useState<string | null>(null);

  useEffect(() => {
    console.log("running");
    const itemsSorted = [...cart.items].sort(
      (a, b) =>
        Date.now() - (a.dateAdded ?? 0) - (Date.now() - (b.dateAdded ?? 0)),
    );

    const recentItem = itemsSorted.at(0);
    if (!recentItem) {
      return;
    }
    setShowCartCheckId(recentItem.id);
    setInterval(() => {
      setShowCartCheckId(null);
    }, 1750);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", '{"items":""}');
  }, []);

  const [filledStars, setFilledStars] = useState<Array<boolean>>([
    true,
    true,
    true,
    true,
    true,
  ]);
  // console.log(query, router);
  // const query = router.query as { store: string | null };

  return (
    <>
      <div className="flex flex-col h-screen bg-secondary">
        <NavBar />

        <div className="w-full flex justify-around items-center px-16 h-16 bg-white dark:bg-gray-800 p-2">
          <form className="flex-1 sm:flex-initial">
            <div className="relative">
              <svg
                className=" absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search Stores..."
                type="search"
              />
            </div>
          </form>

          <Combobox />
        </div>

        <PopularCarousel />
        <CloseToMeCarousel />

        <div
          className={cn([
            "h-3/5  bg-white border-t-2 w-full absolute bottom-0",
            query.searchParams?.get("store") ? "flex" : "hidden",
          ])}
        >
          <div className="w-48 border-r-2 h-full p-2 flex flex-col items-center gap-y-2">
            <Input
              className="pl-8"
              placeholder="Search menu..."
              type="search"
            />

            {popularStores
              .find((store) => store.id === query.searchParams?.get("store"))
              ?.dishTypes.map((item) => (
                <Button
                  onClick={() => {
                    const entries = [
                      ...(query.searchParams?.entries() ?? []),
                    ].filter(([k, v]) => k !== "type");

                    modifyQuery(setQuery, [["type", item.value], ...entries]);
                  }}
                  className={cn([
                    " w-full border-b rounded-lg flex items-center justify-evenly",
                    query.searchParams?.get("type") === item.value
                      ? "bg-primary"
                      : "bg-secondary text-gray-800 hover:bg-accent hover:text-black",
                  ])}
                >
                  <div className="w-3/4">
                    <span>{item.value}</span>
                  </div>
                  <div className="w-1/4">
                    <span className="text-lg ">{item.emoji}</span>
                  </div>
                </Button>
              ))}
          </div>
          <div className=" flex flex-col  w-full ">
            <div className="h-16 border-b flex justify-between items-center px-5">
              <div className="flex items-center justify-start">
                <span className="font-semibold">Min Rating</span>
                <Stars setStarFill={setFilledStars} starFill={filledStars} />
              </div>
              <form className="flex-1 sm:flex-initial">
                <div className="relative">
                  <svg
                    className=" absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <Input
                    value={searchItemsQuery ?? ""}
                    onChange={(e) => {
                      setSearchItemsQuery(e.target.value);
                    }}
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    placeholder="Search Items..."
                    type="search"
                  />
                </div>
              </form>
              <div className="w-52 flex gap-x-2  items-center justify-center">
                <span className="">$0</span>
                <Slider defaultValue={[33]} max={100} step={1} />{" "}
                <span className="">$100</span>
              </div>
            </div>
            <div className="flex w-full p-4 gap-x-5 overflow-y-scroll h-full ">
              {run(() => {
                const item = query.searchParams?.get("item");
                if (item) {
                  return <></>;
                }
                return popularStores
                  .find((store) => store.id == query.searchParams?.get("store"))
                  ?.items.filter(
                    (item) => item.dishType === query.searchParams?.get("type"),
                  )
                  .map((item) => (
                    <div className="h-64 w-64 flex flex-col justify-between px-0 py-0 border rounded-md">
                      {item.src && (
                        <Image
                          className="rounded-lg  w-full  object-fill mb-auto "
                          alt={item.name}
                          width="200"
                          height="200"
                          src={item.src}
                        />
                      )}
                      <div className="w-full text-sm h-12 p-2">
                        {item.description}
                      </div>
                      <div className="w-full flex items-center justify-between p-2 h-12">
                        <span>$100.00</span>
                        {cart.items.filter(
                          (cartItem) => cartItem.id === item.id,
                        ).length !== 0 && <RemoveCartItem item={item} />}
                        <Button
                          className="relative"
                          onClick={() => {
                            setCart((prev) => ({
                              ...prev,
                              items: [
                                ...prev.items,
                                {
                                  ...item,
                                  dateAdded: Date.now(),
                                  checkoutId: crypto.randomUUID(),
                                },
                              ],
                            }));
                          }}
                        >
                          <div className="flex justify-between items-center"></div>
                          {cart.items.filter(
                            (cartItem) => cartItem.id === item.id,
                          ).length !== 0 && (
                            <span className="bg-white rounded-full p-2 w-6 h-6 border text-black absolute top-[-12px] right-[-5px] flex items-center justify-center">
                              {
                                cart.items.filter(
                                  (cartItem) => cartItem.id === item.id,
                                ).length
                              }
                            </span>
                          )}

                          <span> Add to cart</span>
                        </Button>
                      </div>
                    </div>
                  ));
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
