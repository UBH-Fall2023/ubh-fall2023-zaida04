import DelivererNavBar from "@/components/DelivererNavBar";
import { useRouter } from 'next/router'

export default function OrderIndexPage() {
  const router = useRouter()

  return (
    <div>
      <h1>Index. Redirect to queue?</h1>
    </div>
  )
}