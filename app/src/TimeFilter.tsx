import TimeRange from "./components/time-range";
import React, { FC } from "react";
import { useStore } from "./store";
import padStart from "lodash/padStart";
import clsx from "clsx";

function formatHour(hour: number): string {
  const padded = padStart(hour + "", 2, "0");
  return `${padded}:00`;
}

interface TimeFilterProps {
  rangeWrapperClassName?: string;
}

const TimeFilter: FC<TimeFilterProps> = ({ rangeWrapperClassName }) => {
  const timeRange = useStore((s) => s.timeRange);
  const setTimeRange = useStore((s) => s.setTimeRange);
  return (
    <div className="flex space-x-4 items-center">
      <span className="min-w-max grow-0">Time range:</span>
      <div
        className={clsx(
          "flex flex-col space-y-1 items-center grow",
          rangeWrapperClassName
        )}
      >
        <TimeRange values={timeRange} onChange={setTimeRange} />
        <span>{`${formatHour(timeRange[0])} - ${formatHour(
          timeRange[1]
        )}`}</span>
      </div>
    </div>
  );
};

export default TimeFilter;
