import { useUser } from "@/context/useUser";
import React from "react";

type Props = {};

const Test = (props: Props) => {
  const user = useUser();
  return <div>{user?.id}</div>;
};

export default Test;
