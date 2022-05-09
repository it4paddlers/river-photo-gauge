import React, { FC } from "react";
import useMount from "react-use/lib/useMount";
import DateFilter from "./DateFilter";
import Info from "./Info";
import NavButtons from "./NavButtons";
import Photos from "./Photos";
import { useStore } from "./store";
import TimeFilter from "./TimeFilter";

const App: FC = () => {
  const init = useStore((s) => s.init);
  useMount(init);

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
          <div>
            <TimeFilter />
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
