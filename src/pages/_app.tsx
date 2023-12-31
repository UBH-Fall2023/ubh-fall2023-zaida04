import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SocketProvider } from "@/contexts/SocketContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Role, RoleProvider } from "@/contexts/RoleProvider";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  // CHANGE THIS AS YOU WANT
  // const role: Role = Role.CLIENT;
  const [role, setRole] = useState(Role.CLIENT);

  return (
    <RoleProvider.Provider
      value={{
        role,
        setRole,
      }}
    >
      <ClerkProvider {...pageProps}>
        <SocketProvider
          url={
            process.env.NEXT_PUBLIC_VERCEL_URL
              ? "https://deliver-ws.nico.engineer/"
              : "http://localhost:4000/"
          }
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </SocketProvider>
      </ClerkProvider>
    </RoleProvider.Provider>
  );
}
