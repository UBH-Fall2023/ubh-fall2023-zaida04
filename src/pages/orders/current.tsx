import { useRouter } from 'next/router'

import DelivererNavBar from "@/components/DelivererNavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../../components/ui/button';
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@clerk/nextjs";

export default function OrderIndexPage() {
  const router = useRouter()
  const { socket, emitEvent } = useSocket();
  const { user } = useUser();
  const delivererId = user?.id ?? null;

  const sendStatusUpdate = (statusUpdate: number) => {
    if (statusUpdate === 0) {
      socket.emit('updateOrderStatus', currentOrders.ordererId, 'picked-up')
    }

    if (statusUpdate === 1) {
      socket.emit('updateOrderStatus', currentOrders.ordererId, 'delivered')
    }
  }

  return (
    <div>
      <DelivererNavBar route={router.pathname}/>
      <div className="mt-8 flex flex-column md:flex-row w-100 justify-center align-center">
        <Card>
          <CardHeader>
            <CardTitle>Order from John Doe</CardTitle>
            <CardDescription>Placed at 10:45AM</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <span className="font-bold">Items: </span>
              <span>Burger, Something 1, Something 2, Something 3</span>
            </div>
            <div>
              <span className="font-bold">Location: </span>
              <span>Greiner Hall</span>
            </div>
          </CardContent>
          <CardFooter className="w-max flex flex-row justify-around">
            <Button variant="outline" onClick={() => sendStatusUpdate(0)}>Picked Up</Button>
            <Button variant="outline">Delivered</Button>
            <Button variant="outline">Chat</Button>
          </CardFooter>
        </Card>
      </div>
      <h1>Hi</h1>
    </div>
  )
}