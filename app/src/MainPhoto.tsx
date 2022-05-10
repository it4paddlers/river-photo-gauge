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
      <div className="aspect-4/3 md:h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <OverlayComparator
      className="aspect-4/3 md:aspect-auto md:h-full"
      top={photo?.url}
      bottom={reference}
      imgClassName="rounded md:rounded-lg"
    />
  );

  // return (
  //   <SlideComparator className="h-full" top={photo?.url} bottom={reference} />
  // );
};

export default MainPhoto;
