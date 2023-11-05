import { useSocket } from "@/contexts/SocketContext";
import { useEffect } from "react";

export const useOrderSubscribe = (f: () => unknown) => {
  const { socket } = useSocket();
  useEffect(() => {
    socket.on("order", f);
  }, []);
};
