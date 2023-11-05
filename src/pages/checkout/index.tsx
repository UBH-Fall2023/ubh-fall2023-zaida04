import NavBar from "@/components/NavBar";
import { cartAtom } from "@/lib/cartAtom";
import { MealItem } from "@/lib/types";
import { useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";

type Props = {};

const index = (props: Props) => {
  const [cart, setCart] = useState<{ items: Array<MealItem> }>({ items: [] });
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
          {cart.items.map((cartItem) => (
            <></>
            // <div className="border rounded-md w-fit p-3 flex bg-primary">
            //   <div className="w-1/2 h-full">{cartItem.name}</div>
            //   <div className="w-1/2 h-full">{cartItem.price}</div>
            // </div>
          ))}
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
};

export default index;
