import clsx from 'clsx';
import React, { FC, SyntheticEvent, useCallback } from 'react';
import useToggle from 'react-use/lib/useToggle';

import { ComparatorProps } from './types';

function ignoreEvent(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

export const OverlayComparator: FC<ComparatorProps> = ({
  className,
  imgClassName,
  top,
  bottom,
}) => {
  const [hidden, toggleHidden] = useToggle(false);

  const onPress = useCallback(() => {
    toggleHidden(true);
    const show = () => {
      toggleHidden(false);
      document.removeEventListener('mouseup', show);
    };
    document.addEventListener('mouseup', show);
  }, [toggleHidden]);

  // console.log(
  //   clsx('absolute inset-0 object-contain', imgClassName, {
  //     hidden,
  //   }),
  // );

  return (
    <div
      className={clsx(className, 'relative cursor-pointer')}
      onMouseDown={onPress}
      onContextMenu={ignoreEvent}
    >
      <img
        src={bottom}
        className={clsx('absolute inset-0 object-contain', imgClassName)}
        onContextMenu={ignoreEvent}
      />
      <img
        src={top}
        className={clsx('absolute inset-0 object-contain', imgClassName, {
          hidden,
        })}
        onContextMenu={ignoreEvent}
      />
    </div>
  );
};
