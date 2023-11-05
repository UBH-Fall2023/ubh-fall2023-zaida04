import NavBar from "@/components/NavBar";
import { cartAtom } from "@/lib/cartAtom";
import { useAtom } from "jotai";
import React from "react";

type Props = {};

const index = (props: Props) => {
  const [cart, setCart] = useAtom(cartAtom);
  return (
    <div className="bg-[#FEFEFEFE] ">
      <NavBar />
      {cart.items.map((item) => (
        <>
          will search through the searched items for name
          {item.id}
        </>
      ))}
    </div>
  );
};

export default index;
