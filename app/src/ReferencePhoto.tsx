import React, { FC } from "react";
import { useStore } from "./store";

interface ReferencePhotoProps {
  index: number;
  url: string;
  selected: boolean;
}

const ReferencePhoto: FC<ReferencePhotoProps> = ({ url, selected, index }) => {
  const selectReference = useStore((s) => s.selectReference);
  return (
    <div className="cursor-pointer" onClick={() => selectReference(index)}>
      <img
        src={url}
        className={selected ? "ring-offset-2 ring-4 ring-blue-700" : undefined}
      />
    </div>
  );
};

export default ReferencePhoto;
