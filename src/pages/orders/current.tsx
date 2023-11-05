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
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const { socket, emitEvent } = useSocket();
  const { user } = useUser();
  const delivererId = user?.id ?? null;

  const sendStatusUpdate = (orderId: string, statusUpdate: number) => {
    if (statusUpdate === 0) {
      socket.emit("updateOrderStatus", orderId, "picked-up");
    }

    if (statusUpdate === 1) {
      socket.emit("updateOrderStatus", orderId, "delivered");
    }
  };

  useEffect(() => {
    if (!delivererId) return;

    async function fetchOrders() {
      const res = await fetch("/api/orders/current?delivererId=" + delivererId);
      const data = await res.json();
      console.log(data);
      setCurrentOrders(data.items);
      setUsers(data.users);
      setItems(data.fetchedItems);
    }

    fetchOrders();
  }, [delivererId]);

  console.log(currentOrders, users);
  return (
    <div>
      <DelivererNavBar route={router.pathname} />
      <div className="w-full flex justify-center">
        <div className="mt-8 gap-4 flex flex-col w-fit justify-center items-center align-center">
          {currentOrders.map((order) => {
            const currentUser = users.find((x) => x.id === order.ordererId);

            return (
              <Delivery
                name={currentUser?.firstName ?? currentUser?.username ?? ""}
                time={"Today"}
                allItems={items}
                id={order.id}
                items={order.items}
                location={order.location!}
                sendStatusUpdate={sendStatusUpdate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Delivery(props: {
  name: string;
  time: string;
  id: string;
  allItems: Item[];
  items: string[];
  location: string;
  sendStatusUpdate: any;
}) {
  console.log(props);
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
            {props.allItems
              .filter((x) => props.items.includes(x.id))
              .map((item, i, row) => (
                i + 1 === row.length
                  ? <span>{item.name}</span>
                  : <span>{item.name}, </span>
              ))}
          </span>
        </div>
        <div>
          <span className="font-bold">Location: </span>
          <span>{props.location}</span>
        </div>
      </CardContent>
<<<<<<< Updated upstream
      <CardFooter className="w-max flex flex-row justify-around">
        <Button
          variant="outline"
          onClick={() => props.sendStatusUpdate(props.id, 0)}
        >
=======
      <CardFooter className="w-full flex flex-row justify-around">
        <Button variant="outline" onClick={() => null}>
>>>>>>> Stashed changes
          Picked Up
        </Button>
        <Button
          variant="outline"
          onClick={() => props.sendStatusUpdate(props.id, 1)}
        >
          Delivered
        </Button>
        <Button variant="outline">Chat</Button>
      </CardFooter>
    </Card>
  );
}
