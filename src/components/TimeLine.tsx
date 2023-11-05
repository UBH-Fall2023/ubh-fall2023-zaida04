// TimelineItem.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface TimelineItemProps {
  data: {
    date: string;
    title: string;
    description: string;
  };
  isLastItem: boolean;
  colored: boolean;
  isMostRecentActive: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  data,
  isLastItem,
  colored,
  isMostRecentActive,
}) => {
  return (
    <div className="flex items-center mb-8">
      <div className="flex flex-col items-center mr-4">
        <div
          className={cn([`w-0.5 bg-primary ${!isLastItem && "flex-grow"}`])}
        ></div>
        <div className="relative z-10">
          <div className="rounded-full border-4 border-primary p-1 flex items-center justify-center">
            <div
              className={cn([
                "rounded-full bg-primary w-8 h-8",

                colored ? "bg-primary" : "bg-secondary",
                isMostRecentActive ? "animate-pulse" : "",
              ])}
            ></div>
          </div>
        </div>
        <div className={`w-0.5 bg-primary ${!isLastItem && "flex-grow"}`}></div>
      </div>
      <div className="flex-grow">
        {/* <div className="text-sm font-semibold text-primary">{data.date}</div> */}
        <div className="mt-1 text-lg font-semibold">{data.title}</div>
        <div className="text-gray-600">{data.description}</div>
      </div>
    </div>
  );
};

interface EventData {
  date: string;
  title: string;
  description: string;
}

const data: EventData[] = [
  {
    date: "2023-01-01",
    title: "Ordered",
    description: "Your order is placed and is awaiting confirmation",
  },
  {
    date: "2023-02-14",
    title: "Claimed",
    description:
      "Your order has been accepted, your deliverer is bee-lining to get your food!",
  },
  {
    date: "2023-03-30",
    title: "Picked Up",
    description: "Sit tight, your order is on its way!",
  },

  {
    date: "2023-05-10",
    title: "Delivered",
    description: "Enjoy your food!",
  },
];

const statusRanking = {
  ordered: 0,
  claimed: 1,
  "picked-up": 2,
  delivered: 5,
};

export type ThingaMajig = keyof typeof statusRanking;

function Timeline({ status }: { status: ThingaMajig }) {
  const getWhatShouldBeColored = () => {
    const totalOrdering = statusRanking[status];
    console.log(totalOrdering, status);
    return Object.values(statusRanking).map((num) => num <= totalOrdering);
  };

  return (
    <div
      className={`max-w-4xl border-2 w-1/2 mx-auto py-8 border-b-0 rounded-b-none p-4 border-primary rounded-md`}
    >
      <h1 className="text-3xl font-bold mb-8">Timeline</h1>
      <div className="mt-8">
        {data.map((event, idx) => (
          <TimelineItem
            isMostRecentActive={
              getWhatShouldBeColored().findIndex((b) => b === false) - 1 === idx
            }
            colored={getWhatShouldBeColored().at(idx) ?? false}
            data={event}
            key={idx}
            isLastItem={idx === data.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
