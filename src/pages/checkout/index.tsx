import NavBar from "@/components/NavBar";
import RemoveCartItem from "@/components/RemoveCartItem";
import { Checkout } from "@/components/component/checkout";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/lib/cartAtom";
import { MealItem } from "@/lib/types";
import { useAtom } from "jotai";
import { Minus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type Props = {};

const index = (props: Props) => {
  const [cart, setCart] = useAtom(cartAtom);
  useEffect(() => {
    const item = localStorage.getItem("cart");
    if (!item) {
      return;
    }
    setCart(JSON.parse(item) as { items: Array<MealItem> });
  }, []);

  return (
    <div className="bg-[#FEFEFEFE] ">
      <NavBar />

      {/* {cart.items.map((cartItem) => (
        <div className="border rounded-md w-fit p-3">{cartItem.name}</div>
      ))} */}
      <div className="w-full h-screen flex">
        <div className="w-1/2 h-full border-r bg-secondary grid col-span-2">
          {/* {cart.items.map((cartItem) => (
            <div className="w-full h-20"></div>
            // <div className="border rounded-md w-fit p-3 flex bg-primary">
            //   <div className="w-1/2 h-full">{cartItem.name}</div>
            //   <div className="w-1/2 h-full">{cartItem.price}</div>
            // </div>
          ))} */}
          <Checkout />
        </div>
        <div className="w-1/2 h-full flex flex-col items-center gap-y-5 p-5 overflow-y-scroll">
          <p className="text-xl font-bold">Summary</p>
          {cart.items.map((cartItem) => (
            <div className="flex w-full h-full items-center justify-between border-b border-primary  p-4 ">
              {/* <Minus />
               */}
              <RemoveCartItem item={cartItem} />
              <div className="border-2 shadow-lg rounded-md  text-lg font-semibold items-center justify-center  h-fit flex-col  w-fit">
                {cartItem.name}

                {cartItem.src && (
                  <Image
                    width={"200"}
                    height={"200"}
                    alt={cartItem.name}
                    src={cartItem.src}
                  />
                )}
              </div>
              <span className="font-semibold text-lg">
                ${cartItem.price.toFixed(2)}
              </span>
            </div>
            // <div className="border rounded-md w-fit p-3 flex bg-primary">
            //   <div className="w-1/2 h-full">{cartItem.name}</div>
            //   <div className="w-1/2 h-full">{cartItem.price}</div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
