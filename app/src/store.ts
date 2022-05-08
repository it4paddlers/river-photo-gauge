import create from "zustand";
import { Photo, Raw } from "./types";
import low from "./assets/low.jpeg";
import medium from "./assets/medium.jpeg";
import high from "./assets/high.jpeg";
import format from "date-fns/format";
import setTime from "date-fns/set";

import test from "./test.json";
import sub from "date-fns/sub";

export interface State {
  fromDate: Date;
  toDate: Date;
  fromHour: number;
  toHour: number;

  loading: boolean;
  photos: Photo[];
  selectedPhotoIndex: number;

  references: string[];
  selelectedReferenceIndex: number;
}

export interface Actions {
  setDateRange: (from: Date, to: Date) => void;
  selectPhoto: (index: number) => void;
  selectReference: (index: number) => void;
}

export const useStore = create<State & Actions>((set) => ({
  fromDate: new Date(),
  toDate: sub(new Date(), { days: 3 }),
  fromHour: 0,
  toHour: 24,

  loading: false,
  photos: [],
  selectedPhotoIndex: 0,

  references: [low, medium, high],
  selelectedReferenceIndex: 0,

  selectPhoto: (index) => set({ selectedPhotoIndex: index }),

  selectReference: (index) => set({ selelectedReferenceIndex: index }),
  setDateRange: async (from, to) => {
    const fromDate = setTime(from, { hours: 0, minutes: 0, seconds: 0 });
    const toDate = setTime(to, { hours: 23, minutes: 59, seconds: 0 });
    const url = new URL(
      "https://it4paddlers.org/webcams/wassen/index.php?json"
    );
    url.searchParams.append("oldest", format(fromDate, "yyyy-MM-dd'T'HH:mm"));
    url.searchParams.append("newest", format(toDate, "yyyy-MM-dd'T'HH:mm"));

    set({ loading: true, fromDate, toDate });
    try {
      const resp = await fetch(url.href);
      const data: Raw = await resp.json();
      set({
        photos: Object.entries(data).map(([ts, filename]) => ({
          date: new Date(Number(ts)),
          url: "https://it4paddlers.org/webcams/wassen/" + filename,
        })),
        selectedPhotoIndex: 0,
      });
      // set({
      //   photos: Object.entries(test).map(([ts, filename]) => ({
      //     date: new Date(Number(ts)),
      //     url: "https://it4paddlers.org/webcams/wassen/" + filename,
      //   })),
      //   selectedPhotoIndex: 0,
      // });
    } catch (e) {
      console.error("failed to fetch photos", e);
    } finally {
      set({ loading: false });
    }
  },
}));

export function useCurrentPhoto(): Photo | undefined {
  const photos = useStore((state) => state.photos);
  const selectedPhotoIndex = useStore((state) => state.selectedPhotoIndex);
  return photos[selectedPhotoIndex];
}

export function useNextPhoto() {
  const photos = useStore((state) => state.photos);
  const selectedPhotoIndex = useStore((state) => state.selectedPhotoIndex);
  const selectPhoto = useStore((state) => state.selectPhoto);

  return [
    selectedPhotoIndex < photos.length - 1,
    () => selectPhoto(selectedPhotoIndex + 1),
  ] as const;
}

export function usePrevPhoto() {
  const selectedPhotoIndex = useStore((state) => state.selectedPhotoIndex);
  const selectPhoto = useStore((state) => state.selectPhoto);

  return [
    selectedPhotoIndex > 0,
    () => selectPhoto(selectedPhotoIndex - 1),
  ] as const;
}

export function useReferencePhoto() {
  const selelectedReferenceIndex = useStore(
    (state) => state.selelectedReferenceIndex
  );
  const references = useStore((state) => state.references);
  return references[selelectedReferenceIndex];
}
