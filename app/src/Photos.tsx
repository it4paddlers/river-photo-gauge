import clsx from 'clsx';
import React, { FC, useState } from 'react';

import { ReferencePhotos } from './components/reference-photos';
import MainPhoto from './MainPhoto';
import { useCurrentPhoto, useStore } from './store';

const Photos: FC = () => {
  const [reference, setReference] = useState<string | null>(null);
  const photo = useCurrentPhoto();
  const photosLoading = useStore().photosLoading;
  const referencesLoading = useStore().referencesLoading;
  const references = useStore().references;

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
          'rounded md:rounded-lg',
          'md:block md:basis-4/5 md:self-stretch md:overflow-y-hidden md:aspect-auto',
          'flex aspect-4/3',
        )}
      >
        <MainPhoto
          photo={photo}
          reference={reference}
          loading={photosLoading || referencesLoading}
        />
      </div>

      <div
        className={clsx(
          'flex',
          'md:basis-1/5 md:flex-col md:pl-4 md:space-y-4 md:self-stretch',
          'flex-row pt-4 md:pt-0 space-x-4 md:space-x-0',
        )}
      >
        <ReferencePhotos
          loading={referencesLoading}
          onSelect={setReference}
          references={references}
        />
      </div>
    </div>
  );
};

export default Photos;
