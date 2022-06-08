import React, { FC } from 'react';

import DateFilter from './DateFilter';
import TimeFilter from './TimeFilter';

const Filters: FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="basis-1/2 flex items-center">
        <DateFilter />
      </div>
      <div className="basis-1/2">
        <TimeFilter />
      </div>
    </div>
  );
};

export default Filters;
