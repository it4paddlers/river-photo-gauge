import format from 'date-fns/format';
import padStart from 'lodash/padStart';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from './components/button';
import {
  useCurrentPhoto,
  useFilteredPhotos,
  useNextPhoto,
  usePrevPhoto,
  useStore,
} from './store';

const NavButtons: FC = () => {
  const current = useCurrentPhoto();
  const [hasPrev, prev] = usePrevPhoto();
  const [hasNext, next] = useNextPhoto();
  const index = useStore((s) => s.selectedPhotoIndex);
  const total = useFilteredPhotos().length;
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <Button enabled={hasPrev} onPress={prev}>
        {t('prev')}
      </Button>
      {!!total && !!current && (
        <div className="flex flex-col justify-center items-center min-w-50">
          <span>{format(current.date, 'HH:mm - E, dd. MMM yyyyy')}</span>
          <span className="font-mono text-xs text-gray-500">{`${padStart(
            String(index + 1),
            1 + Math.log10(total),
            '0',
          )}/${total}`}</span>
        </div>
      )}
      <Button enabled={hasNext} onPress={next}>
        {t('next')}
      </Button>
    </div>
  );
};

export default NavButtons;
