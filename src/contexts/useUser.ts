import { useContext, useEffect } from "react";
import { User, UserContext } from "./UserProvider";

export const useUser = () => {
  const user = useContext(UserContext);

  if (typeof window === "undefined") {
    return;
  }

  return user;
};
