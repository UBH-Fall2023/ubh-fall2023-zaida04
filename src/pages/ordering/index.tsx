import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-screen w-screen bg-green-600 flex items-center justify-center">
      <span className="h-36 w-36  delay-0 rounded-full animate-pulse bg-green-700" />
      <span className="h-36 w-36  delay-500 rounded-full animate-pulse bg-green-700" />
      <span className="h-36 w-36  delay-1000 top-0 right-0 transition  rounded-full animate-pulse bg-green-700" />
    </div>
  );
};

export default index;
