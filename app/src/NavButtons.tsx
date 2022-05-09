import padStart from "lodash/padStart";
import format from "date-fns/format";
import React, { FC } from "react";
import Button from "./components/button";
import {
  useNextPhoto,
  usePrevPhoto,
  useStore,
  useFilteredPhotos,
  useCurrentPhoto,
} from "./store";

const NavButtons: FC = () => {
  const current = useCurrentPhoto();
  const [hasPrev, prev] = usePrevPhoto();
  const [hasNext, next] = useNextPhoto();
  const index = useStore((s) => s.selectedPhotoIndex);
  const total = useFilteredPhotos().length;
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <Button enabled={hasPrev} onPress={prev}>
        Prev
      </Button>
      {!!total && (
        <div className="flex flex-col justify-center items-center min-w-50">
          <span className="font-mono">{`${padStart(
            index + 1 + "",
            1 + Math.log10(total),
            "0"
          )}/${total}`}</span>
          <span>{format(current.date, "yyyy-MM-dd HH:mm")}</span>
        </div>
      )}
      <Button enabled={hasNext} onPress={next}>
        Next
      </Button>
    </div>
  );
};

export default NavButtons;
