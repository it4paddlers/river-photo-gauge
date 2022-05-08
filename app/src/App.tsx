import React, { FC } from "react";
import Info from "./Info";
import Photos from "./Photos";
import useMount from "react-use/lib/useMount";
import { useStore } from "./store";
import sub from "date-fns/sub";
import NavButtons from "./NavButtons";
import DateFilter from "./DateFilter";

const App: FC = () => {
  const setDateRange = useStore((s) => s.setDateRange);

  // Init range
  useMount(() => {
    const now = new Date();
    setDateRange(sub(now, { days: 3 }), now);
  });

  return (
    <>
      <div className="container mx-auto flex flex-col items-stretch space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <Info />
        </div>

        <div className="bg-white p-4 rounded-lg">
          <div>
            <DateFilter />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <Photos />
        </div>

        <div className="bg-white p-4 rounded-lg">
          <NavButtons />
        </div>
      </div>
    </>
  );
};

export default App;
