import React, { FC } from "react";
import TimeSelector from "./TimeSelector";

interface TimeFilterProps {}

const TimeFilter: FC<TimeFilterProps> = (props) => {
  return (
    <div className="flex space-x-4 items-center">
      <span>Time range:</span>
      <TimeSelector />
      <span>to</span>
      <TimeSelector />
    </div>
  );
};

export default TimeFilter;
