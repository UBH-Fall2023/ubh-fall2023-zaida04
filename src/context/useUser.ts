import { useContext, useEffect } from "react";
import { User, UserContext } from "./UserProvider";

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user || !user.id || !user.role) {
    throw new Error("Must be under user context");
  }
  return user as { [K in keyof User]: NonNullable<User[K]> };
};
