import React, { FC } from "react";
import DatePicker from "./components/date-picker";
import { useStore } from "./store";

const DateFilter: FC = () => {
  const fromDate = useStore((s) => s.fromDate);
  const toDate = useStore((s) => s.toDate);
  const setDateRange = useStore((s) => s.setDateRange);

  return (
    <div className="flex items-center">
      <span className="mr-4">Date range:</span>
      <DatePicker
        selected={fromDate}
        onChange={(date) => setDateRange(date, toDate)}
        selectsEnd
        maxDate={toDate}
      />
      <span className="mx-4">-</span>
      <DatePicker
        selected={toDate}
        onChange={(date) => setDateRange(fromDate, date)}
        selectsEnd
        minDate={fromDate}
      />
    </div>
  );
};

export default DateFilter;
