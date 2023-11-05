import { Minus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/cartAtom";
import { MealItem } from "@/lib/types";

type Props = { item: Omit<MealItem, "dateAdded"> };

const RemoveCartItem = ({ item }: Props) => {
  const [cart, setCart] = useAtom(cartAtom);
  return (
    <Button
      onClick={() => {
        const toRemoveItemIdx = cart.items.findIndex(
          (cartItem) => cartItem.id === item.id,
        );
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((prevItem, idx) => idx !== toRemoveItemIdx),
        }));
      }}
      size={"icon"}
    >
      <Minus />
    </Button>
  );
};

export default RemoveCartItem;
