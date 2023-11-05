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
        <div className="text-sm font-semibold text-primary">{data.date}</div>
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
    description: "You're ordered is placed and is awaiting confirmation",
  },
  {
    date: "2023-02-14",
    title: "Accepted",
    description:
      "Your order has been accepted, your food will be with you at last soon!",
  },
  {
    date: "2023-03-30",
    title: "Waiting",
    description: "Your deliverer is doing the dirty work and waiting on a line",
  },
  {
    date: "2023-04-20",
    title: "Delivering",
    description: "Deliverer is on your way!",
  },
  {
    date: "2023-05-10",
    title: "Delivered",
    description: "Get your food man!",
  },
];

const statusRanking = {
  ordered: 1,
  accepted: 2,
  waiting: 3,
  delivering: 4,
  delivered: 5,
};

export type ThingaMajig = keyof typeof statusRanking;

function Timeline({ status }: { status: ThingaMajig }) {
  const getWhatShouldBeColored = () => {
    const totalOrdering = statusRanking[status];

    return Object.values(statusRanking).map((num) => num <= totalOrdering);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
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
