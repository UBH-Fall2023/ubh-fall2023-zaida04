import React, { Dispatch } from "react";
import Star from "./FilledStar";
import { SetStateAction } from "jotai";
import EmptyStar from "./EmptyStar";
import FilledStar from "./FilledStar";
import { Button } from "./ui/button";

type Props = {
  starFill: Array<boolean>;
  setStarFill?: React.Dispatch<React.SetStateAction<boolean[]>>;
};

const Stars = ({ setStarFill, starFill: startFill }: Props) => {
  const starClickCascade = (idx: number, filled: boolean) => {
    if (!setStarFill) {
      return;
    }
    if (!filled) {
      const newStars = startFill.map((starBool, searchIdx) =>
        searchIdx <= idx ? !filled : starBool,
      );
      setStarFill(newStars);
      return;
    }
    const newStars = startFill.map((starBool, searchIdx) =>
      searchIdx > idx ? !filled : starBool,
    );
    setStarFill(newStars);
  };
  return (
    <div className="flex items-center">
      {startFill.map((filled, idx) => (
        <>
          {setStarFill ? (
            <Button
              onClick={() => starClickCascade(idx, filled)}
              variant="ghost"
              className="w-fit h-fit p-1"
            >
              {filled ? <FilledStar /> : <EmptyStar />}
            </Button>
          ) : filled ? (
            <FilledStar />
          ) : (
            <EmptyStar />
          )}
        </>
      ))}
    </div>
  );
};

export default Stars;
