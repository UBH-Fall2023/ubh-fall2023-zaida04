import { UserContext } from "@/contexts/UserProvider";
import { useContext, useEffect } from "react";

export const useUser = () => {
  const user = useContext(UserContext);

  if (typeof window === "undefined") {
    return;
  }

  return user;
};
