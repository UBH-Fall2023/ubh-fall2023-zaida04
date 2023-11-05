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

export default function OrderIndexPage() {
  const router = useRouter()

  return (
    <div className="w-100">
      <DelivererNavBar route={router.pathname}/>
      <div className="mt-8 flex flex-column md:flex-row w-100 justify-center align-center">
        <Card>
          <CardHeader>
            <CardTitle>Order from John Doe</CardTitle>
            <CardDescription>Placed at 10:45AM</CardDescription>
          </CardHeader>
          <CardContent>

            <p>Picked up Order</p>
            <p>Delivered Order</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <h1>Hi</h1>
    </div>
  )
}