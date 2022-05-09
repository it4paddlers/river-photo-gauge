import React, { FC, forwardRef } from "react";
import { getTrackBackground } from "react-range";
import { ITrackProps } from "react-range/lib/types";
import { MAX, MIN } from "./constants";

interface TrackProps extends ITrackProps {
  values: [number, number];
}

const Track = forwardRef<any, TrackProps>(
  ({ children, values, ...props }, ref) => {
    return (
      <div
        onMouseDown={props.onMouseDown}
        onTouchStart={props.onTouchStart}
        style={{
          ...props.style,
          height: "36px",
          display: "flex",
          width: "100%",
        }}
      >
        <div
          ref={ref}
          style={{
            height: "5px",
            width: "100%",
            borderRadius: "4px",
            background: getTrackBackground({
              values,
              colors: ["#ccc", "rgb(29 78 216)", "#ccc"], // blue 700
              min: MIN,
              max: MAX,
            }),
            alignSelf: "center",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Track.displayName = "Track";

export default Track;
