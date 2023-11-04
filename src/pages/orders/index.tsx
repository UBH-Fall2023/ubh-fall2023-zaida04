import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {

};

export default function MainPage(props: Props) {


  return (
    <div className="h-max flex flex-col items-center justify-center">
      <h1 className="my-8 font-bold text-xl">Available Orders</h1>
      <div className="h-4/6 w-max my-10 border-solid border-red-700">

    <Table>
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
        <TableRow>
          <TableCell className="font-medium">Claim</TableCell>
          <TableCell>Tim Hortons</TableCell>
          <TableCell>$8.32</TableCell>
          <TableCell>$4.50</TableCell>
          <TableCell>5 minutes away</TableCell>
          <TableCell className="text-right">3m 7s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Claim</TableCell>
          <TableCell>Tim Hortons</TableCell>
          <TableCell>$8.32</TableCell>
          <TableCell>$4.50</TableCell>
          <TableCell>5 minutes away</TableCell>
          <TableCell className="text-right">1m 45s</TableCell>
        </TableRow>
      </TableBody>
    </Table>
      </div>
    </div>
  )
}