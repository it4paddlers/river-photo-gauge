import { XIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'react-use/lib/useLocalStorage';

const ComparatorHint: FC = () => {
  const { t } = useTranslation();
  const [comparatorHintHidden, setValue] = useLocalStorage(
    '@river-photo-gauge/comparatorHintHidden',
  );

  if (comparatorHintHidden) {
    return null;
  }

  return (
    <div className="flex py-2">
      <div className="text-sm text-gray-700">{t('comparatorHint')}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-gray-700"
        data-dismiss-target="#comparator-hint"
        aria-label="Close"
        onClick={() => setValue('1')}
      >
        <span className="sr-only">Close</span>
        <XIcon />
      </button>
    </div>
  );
};

export default ComparatorHint;
