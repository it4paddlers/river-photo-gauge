import React, { FC } from "react";
import ReferencePhoto from "./ReferencePhoto";
import { useStore } from "./store";

const ReferencePhotos: FC = () => {
  const references = useStore((s) => s.references);
  const selelectedReferenceIndex = useStore((s) => s.selelectedReferenceIndex);
  return (
    <>
      {references.map((r, i) => (
        <ReferencePhoto
          key={r}
          url={r}
          index={i}
          selected={i === selelectedReferenceIndex}
        />
      ))}
    </>
  );
};

export default ReferencePhotos;
