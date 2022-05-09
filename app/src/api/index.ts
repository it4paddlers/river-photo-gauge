import { Calibration, Photo, Raw } from "../types";
import format from "date-fns/format";
import setTime from "date-fns/set";

export async function fetchPhotos(from: Date, to: Date): Promise<Photo[]> {
  const fromDate = setTime(from, { hours: 0, minutes: 0, seconds: 0 });
  const toDate = setTime(to, { hours: 23, minutes: 59, seconds: 0 });

  const url = new URL("https://it4paddlers.org/webcams/wassen/index.php?json");
  url.searchParams.append("oldest", format(fromDate, "yyyy-MM-dd'T'HH:mm"));
  url.searchParams.append("newest", format(toDate, "yyyy-MM-dd'T'HH:mm"));

  const resp = await fetch(url.href);
  const data: Raw = await resp.json();

  return Object.entries(data).map(([ts, filename]) => {
    return {
      date: new Date(Number(ts) * 1000),
      url: "https://it4paddlers.org/webcams/wassen/" + filename,
    };
  });
}

export async function fetchReferences(): Promise<string[]> {
  const resp = await fetch(
    "https://it4paddlers.org/webcams/wassen/index.php?json_cal"
  );
  const data: Calibration = await resp.json();

  return [data.min, data.med, data.max].map(
    (s) => `https://it4paddlers.org/webcams/wassen/${s}`
  );
}
