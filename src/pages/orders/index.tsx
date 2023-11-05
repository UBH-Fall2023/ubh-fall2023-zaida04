import React, { useState, useEffect } from "react";
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

type Props = {};

export default function MainPage(props: Props) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const query = useQuery({
    queryFn: async () => await (await fetch("/api/orders")).json(),
    queryKey: ["orders"],
  });

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
    const claimOrderStatus = await fetch("/api/orders");
    console.log("clicked");
  };

  useEffect(() => {
    console.log(selectedOrders);
  }, [selectedOrders]);

  return (
    <div className="h-max flex flex-col items-center justify-center">
      <h1 className="my-8 font-bold text-xl">Available Orders</h1>
      <Button disabled={selectedOrders.length === 0} onClick={claimOrder}>
        I'm Ready
      </Button>
      <div
        className={`h-4/6 mt-3 w-5/6 ${
          query.isLoading || query.isError ? "text-center" : null
        }`}
      >
        {query.isLoading && <h1>Loading...</h1>}
        {query.isError && (
          <h1>Oops! An error occured, please try refreshing the page.</h1>
        )}
        {query.data && query.data.data && query.data.data.length > 0 ? (
          <Table className="min-w-full mt-2 border border-gray-300">
            <TableCaption>A list of orders you can pick up.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Action</TableHead>
                <TableHead className="w-[120px]">Restaurant</TableHead>
                <TableHead>Order Total</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead className="w-[150px]">Delivery Location</TableHead>
                <TableHead>Time Elapsed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {query.data.data.map((orderInfo: any, idx: any) => {
                return (
                  <TableRow key={idx}>
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
                    <TableCell>Tim Hortons</TableCell>
                    <TableCell>{`$${orderInfo.orderTotal}`}</TableCell>
                    <TableCell>{`$${orderInfo.tips}`}</TableCell>
                    <TableCell>5 minutes away</TableCell>
                    <TableCell>3m 7s</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : query.isLoading ? null : (
          <span>No orders to be fulfilled...(yet!)</span>
        )}
      </div>
    </div>
  );
}
