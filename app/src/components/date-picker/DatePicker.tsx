import React, { FC } from "react";
import Picker, { ReactDatePickerProps } from "react-datepicker";
import format from "date-fns/format";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import DateButtonInput from "./DateButtonInput";
import Chevron from "./Chevron";

export const DatePicker: FC<ReactDatePickerProps> = (props) => {
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
