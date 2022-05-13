/* eslint-disable import/no-duplicates */
import format from 'date-fns/format';
import setTime from 'date-fns/set';

import { Calibration, Photo, Raw } from '../types';

const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL_BASE = import.meta.env.VITE_IMAGE_URL_BASE;

export async function fetchPhotos(from: Date, to: Date): Promise<Photo[]> {
  const fromDate = setTime(from, { hours: 0, minutes: 0, seconds: 0 });
  const toDate = setTime(to, { hours: 23, minutes: 59, seconds: 0 });

  const url = new URL(API_URL);
  url.searchParams.append('json', '');
  url.searchParams.append('oldest', format(fromDate, "yyyy-MM-dd'T'HH:mm"));
  url.searchParams.append('newest', format(toDate, "yyyy-MM-dd'T'HH:mm"));

  const resp = await fetch(url.href);
  const data: Raw = await resp.json();

  return Object.entries(data).map(([ts, filename]) => {
    return {
      date: new Date(Number(ts) * 1000),
      url: IMAGE_URL_BASE + filename,
    };
  });
}

export async function fetchReferences(): Promise<string[]> {
  const resp = await fetch(`${API_URL}?json_cal`);
  const data: Calibration = await resp.json();

  return [data.min, data.med, data.max].map((s) => `${IMAGE_URL_BASE}${s}`);
}
