import { Dispatch, SetStateAction, createContext } from "react";

export enum Role {
  WALKER = "walker",
  CLIENT = "client",
}

export const RoleProvider = createContext<{
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
}>({
  role: Role.CLIENT,
  setRole: () => console.error("lul"),
});
