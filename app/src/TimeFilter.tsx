import TimeRange from "./components/time-range";
import React, { FC } from "react";
import { useStore } from "./store";

const TimeFilter: FC = () => {
  const timeRange = useStore((s) => s.timeRange);
  const setTimeRange = useStore((s) => s.setTimeRange);
  return (
    <div className="flex space-x-4 items-center">
      <span>Time range:</span>
      <TimeRange values={timeRange} onChange={setTimeRange} />
    </div>
  );
};

export default TimeFilter;
