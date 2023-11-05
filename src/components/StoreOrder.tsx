import { cn, stores, modifyQuery, run } from "@/lib/utils";
import { query } from "express";

import React, { useState } from "react";
import RemoveCartItem from "./RemoveCartItem";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { queryAtom } from "@/lib/queryAtom";
import { useAtom } from "jotai";
import Image from "next/image";
import { cartAtom } from "@/lib/cartAtom";
import Stars from "./Stars";

type Props = {};

const StoreOrder = (props: Props) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const [filledStars, setFilledStars] = useState<Array<boolean>>([
    true,
    true,
    true,
    true,
    true,
  ]);
  return (
    <div className={cn(["h-3/5  bg-white border-t-2 w-full "])}>
      <div className="w-48 border-r-2 h-full p-2 flex flex-col items-center gap-y-2">
        <Input className="pl-8" placeholder="Search menu..." type="search" />

        {stores
          .find((store) => store.id === query.searchParams?.get("store"))
          ?.dishTypes.map((item) => (
            <Button
              onClick={() => {
                const entries = [
                  ...(query.searchParams?.entries() ?? []),
                ].filter(([k, v]) => k !== "type");

                modifyQuery(setQuery, [["type", item.value], ...entries]);
              }}
              className=" w-full border-b rounded-lg flex items-center justify-evenly"
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
        <div className="h-16 border-b flex items-center px-5">
          <div className="flex items-center justify-start">
            <span className="font-semibold">Min Rating</span>
            <Stars setStarFill={setFilledStars} starFill={filledStars} />
          </div>
        </div>
        <div className="flex w-full p-4 gap-x-5 overflow-y-scroll h-full ">
          {run(() => {
            const item = query.searchParams?.get("item");
            if (item) {
              return <></>;
            }
            return stores
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
                    {cart.items.filter((cartItem) => cartItem.id === item.id)
                      .length !== 0 && <RemoveCartItem item={item} />}
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
                      {cart.items.filter((cartItem) => cartItem.id === item.id)
                        .length !== 0 && (
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
  );
};

export default StoreOrder;
