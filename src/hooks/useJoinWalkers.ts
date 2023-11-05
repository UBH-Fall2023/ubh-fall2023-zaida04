import { useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@clerk/nextjs";

export const useJoinWalkers = () => {
  const { user } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.emit("joinWalkers");
  }, []);
};
