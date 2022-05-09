import clsx from "clsx";
import React, { forwardRef } from "react";
import { IMarkProps } from "react-range/lib/types";
import { STEP } from "./constants";

interface MarkProps extends IMarkProps {
  index: number;
  values: [number, number];
}

const Mark = forwardRef<any, MarkProps>(({ index, values, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "h-4 w-1",
        index * STEP < values[0] ? "bg-blue-700" : "#ccc"
      )}
    />
  );
});

Mark.displayName = "Mark";

export default Mark;
