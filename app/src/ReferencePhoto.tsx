import clsx from 'clsx';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from './store';

interface ReferencePhotoProps {
  index: number;
  url: string;
  selected: boolean;
}

const ReferencePhoto: FC<ReferencePhotoProps> = ({ url, selected, index }) => {
  const selectReference = useStore((s) => s.selectReference);
  const { t } = useTranslation();
  return (
    <div
      className="cursor-pointer rounded md:rounded-lg relative"
      onClick={() => selectReference(index)}
    >
      <img
        src={url}
        className={clsx(
          'rounded md:rounded-lg',
          selected && 'ring-offset-2 ring-4 ring-blue-700',
        )}
      />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 p-2 bg-[rgba(0,0,0,0.3)] rounded-b-lg">
        <span className="text-white font-medium">
          {t(`calibration.${index}`)}
        </span>
      </div>
    </div>
  );
};

export default ReferencePhoto;
