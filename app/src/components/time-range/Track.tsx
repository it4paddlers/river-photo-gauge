import React, { forwardRef, ReactNode } from 'react';
import { getTrackBackground } from 'react-range';
import { ITrackProps } from 'react-range/lib/types';

import { BLUE_700, MAX, MIN, SLATE_300 } from './constants';

interface TrackProps extends ITrackProps {
  values: [number, number];
  children?: ReactNode;
}

const Track = forwardRef<any, TrackProps>(
  ({ children, values, ...props }, ref) => {
    return (
      <div
        onMouseDown={props.onMouseDown}
        onTouchStart={props.onTouchStart}
        className="flex w-full h-9 m-2"
        style={props.style}
      >
        <div
          ref={ref}
          className="h-1 w-full rounded self-center"
          style={{
            background: getTrackBackground({
              values,
              colors: [SLATE_300, BLUE_700, SLATE_300],
              min: MIN,
              max: MAX,
            }),
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);

Track.displayName = 'Track';

export default Track;
