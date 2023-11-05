import Timeline from "@/components/TimeLine";
import React, { useEffect } from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <Timeline status="ordered" />
      <div className="flex flex-col">
        {/* <span className="h-36 w-36  delay-0 rounded-full animate-pulse bg-primary" />
        <span className="h-36 w-36  delay-500 rounded-full animate-pulse bg-primary" />
        <span className="h-36 w-36  delay-1000 top-0 right-0 transition  rounded-full animate-pulse bg-primary" /> */}
      </div>
    </div>
  );
};

export default index;
