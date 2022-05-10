import format from 'date-fns/format';
import React, { forwardRef } from 'react';

interface DateButtonInputProps {
  value?: string;
  onClick?: () => void;
}

const DateButtonInput = forwardRef<any, DateButtonInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        type="button"
        className="inline-flex justify-start w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
      >
        {value ? format(new Date(value), 'yyyy-MM-dd') : ''}
      </button>
    );
  },
);

DateButtonInput.displayName = 'DateButtonInput';

export default DateButtonInput;
