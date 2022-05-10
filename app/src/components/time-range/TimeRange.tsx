import React, { FC } from 'react';
import { Range } from 'react-range';

import { MAX, MIN, STEP } from './constants';
import Mark from './Mark';
import Thumb from './Thumb';
import Track from './Track';

export interface TimeRangeProps {
  values: [number, number];
  onChange: (values: [number, number]) => void;
}

export const TimeRange: FC<TimeRangeProps> = ({ values, onChange }) => {
  return (
    <Range
      values={values}
      step={STEP}
      min={MIN}
      max={MAX}
      onChange={onChange}
      renderMark={({ props, index }) => (
        <Mark {...props} index={index} values={values} />
      )}
      renderTrack={({ props, children }) => (
        <Track values={values} {...props}>
          {children}
        </Track>
      )}
      renderThumb={({ props, isDragged }) => (
        <Thumb isDragged={isDragged} {...props} />
      )}
    />
  );
};
