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
import { Loader, MessageCircle } from "lucide-react";

export default function OrderIndexPage() {
  const router = useRouter();
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const { socket, emitEvent } = useSocket();
  const { user } = useUser();
  const delivererId = user?.id ?? null;
  const [isLoading, setIsLoading] = useState(false);

  const sendStatusUpdate = (orderId: string, statusUpdate: number) => {
    console.log("hate all", statusUpdate);
    if (statusUpdate === 0) {
      socket.emit("updateOrderStatus", orderId, {
        status: "picked-up",
        delivererId,
      });
    }

    if (statusUpdate === 1) {
      socket.emit("updateOrderStatus", orderId, {
        status: "delivered",
        delivererId,
      });
    }
  };

  useEffect(() => {
    if (!delivererId) return;

    async function fetchOrders() {
      setIsLoading(true);
      const res = await fetch("/api/orders/current?delivererId=" + delivererId);
      const data = await res.json();
      setIsLoading(false);
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

      <div className="w-full flex gap-2 justify-center items-center">
        {isLoading ? (
          // <Loader className="animate-spin" />
          <div className="animate-pulse border border-rounded bg-secondary rounded-md shadow-md h-56 w-72"></div>
        ) : (
          currentOrders.map((order) => {
            const currentUser = users.find((x) => x.id === order.ordererId);

            return (
              <Delivery
                name={currentUser?.firstName ?? currentUser?.username ?? ""}
                time={"Today"}
                allItems={items}
                ordererId={order.ordererId!}
                id={order.id}
                items={order.items}
                location={order.location!}
                sendStatusUpdate={sendStatusUpdate}
              />
            );
          })
        )}
        <div className="mt-8 gap-4 flex flex-col w-fit justify-center items-center align-center"></div>
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
  ordererId: string;
  location: string;
  sendStatusUpdate: any;
}) {
  const router = useRouter();
  const { user } = useUser();

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
              .map((item, i, row) =>
                i + 1 === row.length ? (
                  <span>{item.name}</span>
                ) : (
                  <span>{item.name}, </span>
                ),
              )}
          </span>
        </div>
        <div>
          <span className="font-bold">Location: </span>
          <span>{props.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-evenly w-full  p-0 py-2 items-center">
        <Button
          variant="outline"
          onClick={() => props.sendStatusUpdate(props.id, 0)}
        >
          Picked Up
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            props.sendStatusUpdate(props.id, 1);
            router.reload();
          }}
        >
          Delivered
        </Button>
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => {
            router.push(`/chat/${props.ordererId}/${user!.id}`);
          }}
        >
          <MessageCircle />
        </Button>
      </CardFooter>
    </Card>
  );
}
