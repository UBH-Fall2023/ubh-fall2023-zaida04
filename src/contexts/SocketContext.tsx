// SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket;
  emitEvent: (event: string, ...args: any[]) => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => useContext(SocketContext)!;

interface SocketProviderProps {
  children: React.ReactNode;
  url: string; // Your Socket.IO server URL
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) return;
    const socketIo = io(url, { transports: ["websocket"] });
    console.log("Connecting to socket.io server");

    setSocket(socketIo);
    return () => {
      console.log("Disconnecting");
      socketIo.disconnect();
    };
  }, [url]);

  useEffect(() => {
    console.log("SOCKET STATE", socket?.connected);
  }, [socket]);

  const emitEvent = (event: string, data: any) => {
    socket?.emit(event, typeof data === "object" ? JSON.stringify(data) : data);
  };

  return (
    <SocketContext.Provider value={{ socket: socket!, emitEvent }}>
      {children}
    </SocketContext.Provider>
  );
};
