import React, { FC } from 'react';

import Spinner from '../spinner';
import ReferencePhoto from './ReferencePhoto';

interface ReferencePhotosProps {
  loading: boolean;
  references: string[];
  onSelect: (reference: string | null) => void;
}

export const ReferencePhotos: FC<ReferencePhotosProps> = (props) => {
  const { loading, references, onSelect } = props;

  if (loading) {
    return (
      <div className="w-full md:w-auto md:h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {references.map((r, i) => (
        <ReferencePhoto key={r} url={r} onSelect={onSelect} index={i} />
      ))}
    </>
  );
};
