import clsx from 'clsx';
import React, { FC } from 'react';

import MainPhoto from './MainPhoto';
import ReferencePhotos from './ReferencePhotos';

const Photos: FC = () => {
  return (
    <div
      className={clsx(
        'flex',
        'md:flex-row md:items-start',
        'flex-col items-stretch',
      )}
    >
      <div
        className={clsx(
          'rounded-lg',
          'md:block md:basis-4/5 md:self-stretch md:overflow-y-hidden md:aspect-auto',
          'flex aspect-4/3',
        )}
      >
        <MainPhoto />
      </div>

      <div
        className={clsx(
          'flex',
          'md:basis-1/5 md:flex-col md:pl-4 md:space-y-4 md:self-stretch',
          'flex-row pt-4 md:pt-0 space-x-4 md:space-x-0',
        )}
      >
        <ReferencePhotos />
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-row">
  //     <div className="basis-4/5 self-stretch overflow-y-hidden rounded-lg">
  //       <MainPhoto />
  //     </div>

  //     <div className="basis-1/5 flex flex-col pl-4 space-y-4">
  //       <ReferencePhotos />
  //     </div>
  //   </div>
  // );
};

export default Photos;
