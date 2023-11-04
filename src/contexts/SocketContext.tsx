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
    const socketIo = io(url);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  const emitEvent = (event: string, ...args: any[]) => {
    socket?.emit(event, ...args);
  };

  return (
    <SocketContext.Provider value={{ socket: socket!, emitEvent }}>
      {children}
    </SocketContext.Provider>
  );
};
