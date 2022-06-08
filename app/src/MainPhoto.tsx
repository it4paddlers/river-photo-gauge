import React, { FC } from 'react';

import Spinner from './components/spinner';
import { Photo } from './types';

interface MainPhotoProps {
  loading: boolean;
  photo?: Photo;
  reference: string | null;
}

const MainPhoto: FC<MainPhotoProps> = ({ loading, photo, reference }) => {
  if (loading) {
    return (
      <div className="aspect-4/3 md:h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative aspect-4/3 w-full md:aspect-auto md:h-full">
      <img
        src={reference ?? photo?.url}
        className="rounded md:rounded-lg absolute inset-0 object-contain"
      />
    </div>
  );
};

export default MainPhoto;
