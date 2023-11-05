import { useSocket } from "@/contexts/SocketContext";
import { OrderForm, MealItem } from "@/lib/types";
import { useEffect } from "react";

export const useOrderSubscribe = (
  f: (
    orderStuff: OrderForm & { items: Array<MealItem> } & { ordererId: string },
  ) => unknown,
) => {
  const { socket } = useSocket();
  useEffect(() => {
    console.log(f)
    socket.on("order", f);
  }, []);
};
