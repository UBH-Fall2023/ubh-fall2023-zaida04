import NavBar from "@/components/NavBar";
import RemoveCartItem from "@/components/RemoveCartItem";
import { Checkout } from "@/components/component/checkout";
import { cartAtom } from "@/lib/cartAtom";
import { useAtom } from "jotai";
import React from "react";

type Props = {};

export default function Index(props: Props) {
  const [cart, setCart] = useAtom(cartAtom);
  // useEffect(() => {
  //   const item = localStorage.getItem("cart");
  //   if (!item) {
  //     return;
  //   }
  //   setCart(JSON.parse(item) as { items: Array<MealItem> });
  // }, []);
  // t j

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
          <p className="text-lg font-semibold">
            <span> Subtotal: $</span>
            <span>
              {cart.items
                .reduce((prev, curr) => curr.price + prev, 0)
                .toFixed(2)}
            </span>
          </p>
          {cart.items.map((cartItem) => (
            <div className="flex w-full h-full items-center gap-2 border-b border-primary  p-4 ">
              {/* <Minus />
               */}
              <RemoveCartItem item={cartItem} />
              <CartItem
                imgUrl={cartItem.src!}
                item={cartItem.name}
                price={cartItem.price.toString()}
              />
              {/* <div className="border-2 shadow-lg rounded-md  text-lg font-semibold items-center justify-center  h-fit flex-col  w-fit">
                {cartItem.name}

                {cartItem.src && (
                  <Image
                    width={"200"}
                    height={"200"}
                    alt={cartItem.name}
                    src={cartItem.src}
                  />
                )}
              </div> */}
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
