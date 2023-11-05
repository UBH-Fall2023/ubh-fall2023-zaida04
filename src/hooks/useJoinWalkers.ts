import { useEffect } from "react";
import { useUser } from "./useUser";
import { useSocket } from "@/contexts/SocketContext";

export const useJoinWalkers = () => {
  const user = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.emit("joinWalkers");

    useEffect(() => {}, []);
  }, []);
};
