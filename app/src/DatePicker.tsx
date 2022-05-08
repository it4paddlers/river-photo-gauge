import React, { FC } from "react";
import Picker, { ReactDatePickerProps } from "react-datepicker";
import format from "date-fns/format";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import DateButtonInput from "./DateButtonInput";
import clsx from "clsx";

interface ChevronProps {
  onClick?: () => void;
  disabled?: boolean;
}

const Chevron: FC<ChevronProps> = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type="button"
    className={clsx([
      "inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500",
      { "cursor-not-allowed opacity-50": disabled },
    ])}
  >
    {children}
  </button>
);

const DatePicker: FC<ReactDatePickerProps> = (props) => {
  return (
    <Picker
      {...props}
      popperClassName="react-datepicker-left"
      customInput={<DateButtonInput />}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-lg text-gray-900">
            {format(date, "MMMM yyyy")}
          </span>

          <div className="space-x-2">
            <Chevron onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </Chevron>

            <Chevron onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </Chevron>
          </div>
        </div>
      )}
    />
  );
};

export default DatePicker;
