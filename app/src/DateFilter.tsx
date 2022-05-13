import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import DatePicker from './components/date-picker';
import { useStore } from './store';

const DateFilter: FC = () => {
  const [fromDate, toDate] = useStore((s) => s.dateRange);
  const setDateRange = useStore((s) => s.setDateRange);
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <span className="mr-4">{t('dateFilterLabel')}</span>
      <DatePicker
        selected={fromDate}
        onChange={(date) => {
          setDateRange(date, toDate);
        }}
        selectsEnd
        maxDate={toDate}
      />
      <span className="mx-4">-</span>
      <DatePicker
        selected={toDate}
        onChange={(date) => {
          setDateRange(fromDate, date);
        }}
        selectsEnd
        minDate={fromDate}
      />
    </div>
  );
};

export default DateFilter;
