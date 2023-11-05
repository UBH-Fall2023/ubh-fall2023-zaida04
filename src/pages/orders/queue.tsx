import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import DelivererNavBar from "@/components/DelivererNavBar";
import { useOrderSubscribe } from "@/hooks/useOrdersSubscribe";
import { useJoinWalkers } from "@/hooks/useJoinWalkers";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@clerk/nextjs";
import { Order } from "@/db/drizzle";
import { formatDistance } from "date-fns";

type Props = {};

export default function QueuePage(props: Props) {
  const router = useRouter();
  const { socket, emitEvent } = useSocket();
  const [orders, setOrders] = useState<(Order & { restaurantName: string })[]>(
    [],
  );
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const { user } = useUser();
  const delivererId = user?.id ?? null;

  async function fetchOrder() {
    const res = await fetch("/api/orders");
    const data = await res.json();

    const mutatedData = await Promise.all(
      data.data.map(async (placedOrder: any) => {
        const oneItem = placedOrder.items[0];
        const itemData = await fetch(`/api/restaurant/${oneItem}`);
        const dewrappedData = await itemData.json();
        const restaurantName = dewrappedData.data.restaurantName || null;

        return {
          ...placedOrder,
          restaurantName: restaurantName,
        };
      }),
    );

    setOrders(mutatedData.sort((a, b) => a.createdAt - b.createdAt));
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (orders && orders.length > 0 && !orders[0].restaurantName)
      router.reload();
  }, [orders]);

  const selectOrder = (c: string | Boolean, orderId: string) => {
    if (c) {
      if (selectedOrders.length === 3) {
        return console.log("Reached max capacity of order pickups!");
      } else {
        return setSelectedOrders([...selectedOrders, orderId]);
      }
    }

    return setSelectedOrders(selectedOrders.filter((item) => item !== orderId));
  };

  const claimOrder = async () => {
    socket.emit("claimOrder", delivererId, selectedOrders);
    router.push("/orders/current");
  };

  useEffect(() => {
    // console.log(socket, delivererId);
    if (!socket || !delivererId) return;

    const handler = (data: Order) => {
      // console.log("NEW ORDER", data);
      // setOrders((prev) => [...prev, data]);
      fetchOrder();
    };
    socket.on("order", handler);
    emitEvent("joinRoom", delivererId);
    emitEvent("joinRoom", "walkers");
  }, [socket, delivererId]);

  return (
    <div>
      <DelivererNavBar route={router.pathname} />
      <div className="h-max flex flex-col items-center justify-center">
        <h1 className="my-8 font-bold text-xl">Deliverer Dashboard</h1>
        <Button disabled={selectedOrders.length === 0} onClick={claimOrder}>
          I'm Ready
        </Button>
        <div
          className={
            `h-4/6 mt-3 w-5/6 ` +
            (orders.length === 0 ? "text-center mt-4" : "")
          }
        >
          {/* {query.isLoading && <h1>Loading...</h1>} */}
          {/* {query.isError && (
            <h1>Oops! An error occured, please try refreshing the page.</h1>
          )} */}
          {orders.length > 0 ? (
            <Table className="min-w-full mt-2 border border-gray-300">
              <TableCaption>A list of orders you can pick up.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Action</TableHead>
                  <TableHead className="w-[120px]">Restaurant</TableHead>
                  <TableHead>Order Total</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Time Elapsed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((orderInfo: any) => {
                  return (
                    <TableRow key={orderInfo.id}>
                      <TableCell className="font-medium">
                        <div className="flex gap-2">
                          <Checkbox
                            onCheckedChange={(c: any) =>
                              selectOrder(c, orderInfo.id)
                            }
                            className="my-auto"
                          />
                          <p>Claim</p>
                        </div>
                      </TableCell>
                      <TableCell>{`${orderInfo.restaurantName}`}</TableCell>
                      <TableCell>{`$${orderInfo.orderTotal}`}</TableCell>
                      <TableCell>{`$${orderInfo.tips}`}</TableCell>
                      <TableCell>
                        {formatDistance(
                          new Date(orderInfo.createdAt),
                          new Date(),
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : orders.length === 0 ? (
            <span>There's currently no orders in the queue!</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}
