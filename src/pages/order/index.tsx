import React from "react";

type Props = {};

// const categories = {
//   "Speed ⚡": "speed",

// }
const categories = ["Speed 🏃‍♂️", "Most Popular 🎉", "On A Budget 🤑"];

const index = (props: Props) => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-16 border-b border-primary"></div>
      <div className="flex w-full h-16 border-b items-center justify-around">
        {categories.map((category) => (
          <div className="rounded-md border-2 flex items-center justify-center p-2">
            {category}
          </div>
        ))}
      </div>
      <div className="w-full h-16 border-b "></div>
    </div>
  );
};

export default index;
