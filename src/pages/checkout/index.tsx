import NavBar from "@/components/NavBar";
import RemoveCartItem from "@/components/RemoveCartItem";
import { Checkout } from "@/components/component/checkout";
import { useSocket } from "@/contexts/SocketContext";
import { cartAtom } from "@/lib/cartAtom";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

type Props = {};

export default function Index(props: Props) {
  const [cart, setCart] = useAtom(cartAtom);
  const { socket, emitEvent } = useSocket();
  const { user } = useUser();
  // useEffect(() => {
  //   const item = localStorage.getItem("cart");
  //   if (!item) {
  //     return;
  //   }
  //   setCart(JSON.parse(item) as { items: Array<MealItem> });
  // }, []);
  // t j

  useEffect(() => {
    if (!socket || !user) return;
    emitEvent("joinRoom", user.id);
  }, [socket, user]);

  return (
    <div className="bg-[#FEFEFEFE] ">
      <NavBar />

      <div className="w-full h-screen flex">
        <div className="w-1/2 h-full border-r bg-secondary grid col-span-2">
          <Checkout />
        </div>
        <div className="w-1/2 h-full flex flex-col items-center gap-y-5 p-5 overflow-y-scroll">
          <p className="text-xl font-bold">Summary</p>
          <p className="text-lg font-semibold">
            <span> Subtotal: $</span>
            <span>
              {cart.items
                .reduce((prev, curr) => curr.price + prev, 0)
                .toFixed(2)}
            </span>
          </p>
          {cart.items.map((cartItem) => (
            <div className="flex w-full items-center gap-2 border-b border-primary  p-4 ">
              <RemoveCartItem item={cartItem} />
              <CartItem
                imgUrl={cartItem.src!}
                item={cartItem.name}
                price={cartItem.price.toString()}
              />
              <span className="font-semibold text-lg">
                ${cartItem.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartItem(props: { imgUrl: string; item: string; price: string }) {
  return (
    <div className="w-full k flex items-center gap-4 mb-3">
      <img
        alt="Product 1"
        className="rounded-full object-cover"
        height={50}
        src={props.imgUrl}
        style={{
          aspectRatio: "50/50",
          objectFit: "cover",
        }}
        width={50}
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-base md:text-lg">{props.item}</h3>
        {/* <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {props.price}
        </p> */}
      </div>
    </div>
  );
}
