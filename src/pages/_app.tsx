import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SocketProvider } from "@/contexts/SocketContext";
import { Role, User, UserContext } from "@/context/UserProvider";
import { useEffect, useState } from "react";
import Test from "./Test";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User | null>({
    // this data is purely for rendering during ssr and is dumb
    id: crypto.randomUUID(),
    role: Role.CLIENT,
  });

  useEffect(() => {
    const oldUser = localStorage.getItem("user");
    if (!oldUser) {
      const u = {
        id: crypto.randomUUID(),
        role: Role.CLIENT,
      };
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
      return;
    }

    setUser(JSON.parse(oldUser));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <SocketProvider url="http://localhost:4000/">
        <QueryClientProvider client={queryClient}>
          <div className="w-full h-16 bg-red">
            <Test />
          </div>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SocketProvider>
    </UserContext.Provider>
  );
}
