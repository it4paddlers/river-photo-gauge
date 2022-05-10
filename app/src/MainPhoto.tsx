import React, { FC } from 'react';

import { OverlayComparator } from './components/comparator';
import Spinner from './components/spinner';
import { useCurrentPhoto, useReferencePhoto, useStore } from './store';

const MainPhoto: FC = () => {
  const loading = useStore((s) => s.photosLoading);
  const photo = useCurrentPhoto();
  const reference = useReferencePhoto();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <OverlayComparator className="h-full" top={photo?.url} bottom={reference} />
  );

  // return (
  //   <SlideComparator className="h-full" top={photo?.url} bottom={reference} />
  // );
};

export default MainPhoto;
