import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { IMarkProps } from 'react-range/lib/types';

interface MarkProps extends IMarkProps {
  index: number;
  values: [number, number];
}

const Mark = forwardRef<any, MarkProps>(
  ({ index: _index, values: _values, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={clsx('h-2 w-0.5', 'bg-white')} />
    );
  },
);

Mark.displayName = 'Mark';

export default Mark;
