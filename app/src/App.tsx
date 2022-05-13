import React, { FC } from 'react';
import useMount from 'react-use/lib/useMount';

import { ComparatorHint } from './components/comparator';
import Filters from './Filters';
import Info from './Info';
import NavButtons from './NavButtons';
import Photos from './Photos';
import { useStore } from './store';

const App: FC = () => {
  const init = useStore((s) => s.init);
  useMount(init);

  return (
    <div className="container mx-auto flex flex-col items-stretch space-y-4">
      <div className="bg-white p-2 md:p-4 rounded md:rounded-lg">
        <Info />
      </div>

      <div className="bg-white p-2 md:p-4 rounded md:rounded-lg">
        <Filters />
      </div>

      <div className="bg-white p-2 md:p-4 rounded md:rounded-lg empty:hidden">
        <ComparatorHint />
      </div>

      <div className="bg-white p-2 md:p-4 rounded md:rounded-lg">
        <Photos />
      </div>

      <div className="bg-white p-2 md:p-4 rounded md:rounded-lg">
        <NavButtons />
      </div>
    </div>
  );
};

export default App;
