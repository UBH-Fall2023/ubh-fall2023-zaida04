import { createContext } from "react";

export enum Role {
  WALKER = "walker",
  CLIENT = "client",
}
export type User = {
  id: string | null;
  role: Role | null;
};
export const UserContext = createContext<User | null>({
  id: null,
  role: null,
});
