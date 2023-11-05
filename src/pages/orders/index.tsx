import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/orders/queue')
  }, [])

  return (
    <div>
      <span>...</span>
    </div>
  )
}