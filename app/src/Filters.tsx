import React, { FC } from "react";
import DateFilter from "./DateFilter";
import TimeFilter from "./TimeFilter";

const Filters: FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="basis-1/2">
        <DateFilter />
      </div>
      <div className="basis-1/2">
        <TimeFilter rangeWrapperClassName="pt-4 md:pt-0" />
      </div>
    </div>
  );
};

export default Filters;
