import React, { FC } from "react";

const Info: FC = () => {
  return (
    <>
      <h1>River Photo Gauge</h1>

      <p>
        Location: Takeout of the{" "}
        <a href="https://rivermap.org/map/#sprache=de&amp;styled=1&amp;zoom=14&amp;lat=46.69075&amp;lng=8.60010&amp;inf=113">
          Göschenen-Wassen Section
        </a>
        .
      </p>

      <p>
        We are working on finding the best way how to present these pictures...
        This is just the bare minimum. A better(?) slideshow-style presentation
        is here, but it might be broken, as it is work in progress.
      </p>

      <br />

      <h2>Calibration</h2>

      <p>
        Data missing, we need your help!
        <br />
        We need info about what pictures show low/med/high. So if you have an
        opinion about the flow you see in the pictures, please{" "}
        <a href="mailto:toro@kanuschle.ch">tell us</a>.
        <br />
        Or, tell us when you paddled there and how you experienced that level.
        <br />
        Wishes, advice, contributions welcome too ;-)
      </p>

      <p>
        We think{" "}
        <a href="https://redpig.ch/webcams/wassen/calibration_images/daymax-Wassenphoto_2021-07-12_20-24-51.jpg">
          this is somewhere in the medium range
        </a>
        . Do you agree? And what about low and high?
      </p>
    </>
  );
};

export default Info;
