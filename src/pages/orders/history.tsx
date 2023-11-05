import DelivererNavBar from "@/components/DelivererNavBar";
import { useRouter } from 'next/router'

export default function OrderIndexPage() {
  const router = useRouter()

  return (
    <div>
      <DelivererNavBar route={router.pathname}/>
      <h1>History</h1>
    </div>
  )
}