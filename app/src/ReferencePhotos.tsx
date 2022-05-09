import React, { FC } from "react";
import ReferencePhoto from "./ReferencePhoto";
import { useStore } from "./store";
import Spinner from "./components/spinner";

const ReferencePhotos: FC = () => {
  const references = useStore((s) => s.references);
  const selelectedReferenceIndex = useStore((s) => s.selelectedReferenceIndex);
  const loading = useStore((s) => s.referencesLoading);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

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
