import { useRouter } from "next/router";

import DelivererNavBar from "@/components/DelivererNavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Item, Order } from "@/db/drizzle";
import { User } from "@clerk/nextjs/server";

export default function OrderIndexPage() {
  const router = useRouter();
  const [currentOrders, setCurrentOrders] = useState<
    (Omit<Order, "items"> & { items: Item[] })[]
  >([]);
  const [users, setUsers] = useState<User[]>([]);
  const { socket, emitEvent } = useSocket();
  const { user } = useUser();
  const delivererId = user?.id ?? null;

  const sendStatusUpdate = (statusUpdate: number) => {
    if (statusUpdate === 0) {
      socket.emit("updateOrderStatus", currentOrders.ordererId, "picked-up");
    }

    if (statusUpdate === 1) {
      socket.emit("updateOrderStatus", currentOrders.ordererId, "delivered");
    }
  };

  useEffect(() => {
    if (!delivererId) return;

    async function fetchOrders() {
      const res = await fetch("/api/orders/current?delivererId=" + delivererId);
      const data = await res.json();
      console.log(data);
      setCurrentOrders(data.items);
    }

    fetchOrders();
  }, [currentOrders, delivererId]);

  return (
    <div>
      <DelivererNavBar route={router.pathname} />
      <div className="mt-8 flex flex-column md:flex-row w-100 justify-center align-center">
        {currentOrders.map((order) => (
          <Delivery
            name={users.find((x) => x.id === order.ordererId)?.username ?? ""}
            time={"Today"}
            items={order.items}
            location={order.location!}
          />
        ))}
      </div>
    </div>
  );
}

function Delivery(props: {
  name: string;
  time: string;
  items: Item[];
  location: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order from {props.name}</CardTitle>
        <CardDescription>Placed at {props.time}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span className="font-bold">Items: </span>
          <span>
            {props.items.map((item) => (
              <span>{item.name}, </span>
            ))}
          </span>
        </div>
        <div>
          <span className="font-bold">Location: </span>
          <span>{props.location}</span>
        </div>
      </CardContent>
      <CardFooter className="w-max flex flex-row justify-around">
        <Button variant="outline" onClick={() => null}>
          Picked Up
        </Button>
        <Button variant="outline">Delivered</Button>
        <Button variant="outline">Chat</Button>
      </CardFooter>
    </Card>
  );
}
