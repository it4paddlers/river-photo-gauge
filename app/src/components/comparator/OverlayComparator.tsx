import clsx from "clsx";
import React, { FC, SyntheticEvent, useCallback, useState } from "react";
import { ComparatorProps } from "./types";

function ignoreEvent(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

export const OverlayComparator: FC<ComparatorProps> = ({
  className,
  top,
  bottom,
}) => {
  const [hidden, setHidden] = useState(false);

  const onPress = useCallback(() => {
    setHidden(true);
    const show = () => {
      setHidden(false);
      document.removeEventListener("mouseup", show);
    };
    document.addEventListener("mouseup", show);
  }, [setHidden]);

  return (
    <div
      className={clsx(className, "relative cursor-pointer")}
      onMouseDown={onPress}
      onContextMenu={ignoreEvent}
    >
      <img
        src={bottom}
        className="absolute inset-0 object-contain"
        onContextMenu={ignoreEvent}
      />
      <img
        src={top}
        className={clsx("absolute inset-0 object-contain", { hidden })}
        onContextMenu={ignoreEvent}
      />
    </div>
  );
};
