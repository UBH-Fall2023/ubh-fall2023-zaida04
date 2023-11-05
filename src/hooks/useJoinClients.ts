import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const joinClients = () => {
  const { user } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.emit("joinWalkers");
  }, [user, socket]);
};
