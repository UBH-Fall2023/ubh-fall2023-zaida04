import Timeline, { ThingaMajig } from "@/components/TimeLine";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

export default function (props: Props) {
  const { socket } = useSocket();
  const [status, setStatus] = useState<ThingaMajig>("ordered");
  const router = useRouter();
  const { user } = useUser();
  const [delivererId, setDelivererId] = useState<null | string>(null);
  const orderId = router.query.orderId as string;

  useEffect(() => {
    if (!socket) return;
    socket.on(
      "orderUpdate",
      ({
        delivererId,
        status,
      }: {
        status: ThingaMajig;
        delivererId: string;
      }) => {
        console.log({ delivererId });
        if (delivererId) {
          setDelivererId(delivererId);
        }

        setStatus(status);
      },
    );
  }, [socket]);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      setStatus(data.order.status);
      setDelivererId(data.order.delivererId);
    }

    fetchOrder();
  }, [orderId]);

  return (
    <div className="h-screen w-screen  flex flex-col items-center justify-center">
      <Timeline status={status ?? "ordered"} />
      <Button
        disabled={status === "ordered"}
        onClick={() => {
          if (!user || !delivererId) return;
          router.push(`/chat/${orderId}`);
        }}
        className="w-1/2 rounded-t-none"
      >
        Chat with deliverer 💬
      </Button>
    </div>
  );
}
