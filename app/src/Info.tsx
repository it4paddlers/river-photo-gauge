import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Info: FC = () => {
  const { t } = useTranslation();
  const name = import.meta.env.VITE_SECTION_TITLE;
  return (
    <>
      <h1>{t('title')}</h1>

      <Trans i18nKey="info" values={{ name }}>
        Location <a href={import.meta.env.VITE_GAUGE_LINK}>{`{{ name }}`}</a>
      </Trans>
    </>
  );
};

export default Info;
