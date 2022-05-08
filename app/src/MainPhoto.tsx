import React, { FC } from "react";
import { ReactCompareSlider } from "react-compare-slider";
import Spinner from "./Spinner";
import { useCurrentPhoto, useReferencePhoto, useStore } from "./store";

const MainPhoto: FC = () => {
  const loading = useStore((s) => s.loading);
  const photo = useCurrentPhoto();
  const reference = useReferencePhoto();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ReactCompareSlider
      className="h-full"
      itemOne={
        <img
          className="absolute top-0 bottom-0 left-0 right-0"
          src={photo?.url}
        />
      }
      itemTwo={
        <img
          className="absolute top-0 bottom-0 left-0 right-0"
          src={reference}
        />
      }
    />
  );
};

export default MainPhoto;
