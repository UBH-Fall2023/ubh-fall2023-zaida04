import React from "react";

type Props = {};

const Star = (props: Props) => {
  return (
    <div className="flex items-center gap-0.5">
      <svg
        className=" w-5 h-5 fill-primary"
        fill="none"
        height="24"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>
  );
};

export default Star;
