import { Photo } from '../types';

export default function filterPhotosByTime(
  photos: Photo[],
  range: [number, number],
): Photo[] {
  return photos.filter((p) => {
    const h = p.date.getHours();
    return h >= range[0] && h < range[1];
  });
}
