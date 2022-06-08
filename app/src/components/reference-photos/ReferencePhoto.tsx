import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useTapAndHold from './useTapAndHold';

interface ReferencePhotoProps {
  index: number;
  url: string;
  onSelect: (reference: string | null) => void;
}

const ReferencePhoto: FC<ReferencePhotoProps> = (props) => {
  const { index, url, onSelect } = props;
  const handlers = useTapAndHold(url, onSelect);
  const { t } = useTranslation();
  return (
    <div
      className="cursor-pointer rounded md:rounded-lg relative"
      {...handlers}
    >
      <img
        src={url}
        className="rounded md:rounded-lg select-none"
        draggable={false}
      />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 p-2 bg-[rgba(0,0,0,0.3)] rounded-b-lg">
        <span className="text-white font-medium select-none">
          {t(`calibration.${index}`)}
        </span>
      </div>
    </div>
  );
};

export default ReferencePhoto;
