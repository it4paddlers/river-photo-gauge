import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { IThumbProps } from 'react-range/lib/types';

interface ThumbProps extends IThumbProps {
  isDragged: boolean;
}

const Thumb = forwardRef<any, ThumbProps>(({ isDragged, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'w-4 h-4 -ml-2 rounded-full absolute cursor-pointer bg-blue-700 hover:bg-blue-800 outline-none',
        isDragged && 'bg-blue-900',
      )}
    />
  );
});

Thumb.displayName = 'Thumb';

export default Thumb;
