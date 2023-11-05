import Timeline, { ThingaMajig } from "@/components/TimeLine";
import { useSocket } from "@/contexts/SocketContext";
import React, { useEffect, useState } from "react";

type Props = {};

export default function (props: Props) {
  const { socket } = useSocket();
  const [status, setStatus] = useState<ThingaMajig>("ordered");
  useEffect(() => {
    if (!socket) return;
    socket.on("orderUpdate", (status: ThingaMajig) => {
      setStatus(status);
    });
  }, [socket]);
  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <Timeline status={status ?? "ordered"} />
      <div className="flex flex-col"></div>
    </div>
  );
}
