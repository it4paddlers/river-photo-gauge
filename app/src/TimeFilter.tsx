import padStart from 'lodash/padStart';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import TimeRange from './components/time-range';
import { useStore } from './store';

function formatHour(hour: number): string {
  const padded = padStart(hour.toString(), 2, '0');
  return `${padded}:00`;
}

const TimeFilter: FC = () => {
  const timeRange = useStore((s) => s.timeRange);
  const setTimeRange = useStore((s) => s.setTimeRange);
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-[100px_1fr]">
      <div className="flex items-center">{t('timeFilterLabel')}</div>
      <div className="flex items-center">
        <TimeRange values={timeRange} onChange={setTimeRange} />
      </div>
      <div className="-mt-3" />
      <div className="flex justify-center -mt-3">{`${formatHour(
        timeRange[0],
      )} - ${formatHour(timeRange[1])}`}</div>
    </div>
  );
};

export default TimeFilter;
