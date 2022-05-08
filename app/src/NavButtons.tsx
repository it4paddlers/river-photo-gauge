import React, { FC, useState } from "react";
import Button from "./Button";
import { useNextPhoto, usePrevPhoto, useStore } from "./store";
import padStart from "lodash/padStart";

const NavButtons: FC = () => {
  const [hasPrev, prev] = usePrevPhoto();
  const [hasNext, next] = useNextPhoto();
  const index = useStore((s) => s.selectedPhotoIndex);
  const total = useStore((s) => s.photos?.length);
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <Button enabled={hasPrev} onPress={prev}>
        Prev
      </Button>
      {!!total && (
        <div className="flex justify-center items-center min-w-50">
          <span className="font-mono">{`${padStart(
            index + 1 + "",
            1 + Math.log10(total),
            "0"
          )}/${total}`}</span>
        </div>
      )}
      <Button enabled={hasNext} onPress={next}>
        Next
      </Button>
    </div>
  );
};

export default NavButtons;
