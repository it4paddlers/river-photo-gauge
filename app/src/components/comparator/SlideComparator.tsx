import React, { FC } from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

import { ComparatorProps } from './types';

export const SlideComparator: FC<ComparatorProps> = ({
  top,
  bottom,
  className,
}) => {
  return (
    <ReactCompareSlider
      className={className}
      itemOne={
        <img className="absolute top-0 bottom-0 left-0 right-0" src={top} />
      }
      itemTwo={
        <img className="absolute top-0 bottom-0 left-0 right-0" src={bottom} />
      }
    />
  );
};
