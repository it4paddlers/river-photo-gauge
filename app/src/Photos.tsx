import React, { FC } from 'react';

import MainPhoto from './MainPhoto';
import ReferencePhotos from './ReferencePhotos';

const Photos: FC = () => {
  return (
    <div className="flex flex-row">
      <div className="basis-4/5 self-stretch overflow-y-hidden rounded-lg">
        <MainPhoto />
      </div>

      <div className="basis-1/5 flex flex-col pl-4 space-y-4">
        <ReferencePhotos />
      </div>
    </div>
  );
};

export default Photos;
