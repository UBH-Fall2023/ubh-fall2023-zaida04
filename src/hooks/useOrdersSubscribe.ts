import { useSocket } from "@/contexts/SocketContext";
import { OrderForm, MealItem } from "@/lib/types";
import { useEffect } from "react";

export const useOrderSubscribe = (
  f: (
    orderStuff: OrderForm & { items: Array<MealItem> } & { orderedId: string },
  ) => unknown,
) => {
  const { socket } = useSocket();
  useEffect(() => {
    socket.on("order", f);
  }, []);
};
