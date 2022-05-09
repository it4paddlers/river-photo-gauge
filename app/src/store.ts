import sub from "date-fns/sub";
import { useMemo } from "react";
import create from "zustand";
import { fetchReferences, fetchPhotos } from "./api";
import { Photo } from "./types";

export interface State {
  fromDate: Date;
  toDate: Date;

  // Within each day only photos in this hour rannge will be displayed
  timeRange: [fromHour: number, toHour: number];

  photos: Photo[];
  photosLoading: boolean;
  selectedPhotoIndex: number;

  references: string[];
  referencesLoading: boolean;
  selelectedReferenceIndex: number;
}

export interface Actions {
  setDateRange: (from: Date, to: Date) => Promise<void>;
  setTimeRange: (range: [number, number]) => void;
  selectPhoto: (index: number) => void;
  selectReference: (index: number) => void;
  init: () => Promise<void>;
}

export const useStore = create<State & Actions>((set, get) => ({
  fromDate: sub(new Date(), { days: 3 }),
  toDate: new Date(),
  timeRange: [0, 24],

  photos: [],
  photosLoading: false,
  selectedPhotoIndex: 0,

  references: [],
  referencesLoading: false,
  selelectedReferenceIndex: 0,

  selectPhoto: (index) => set({ selectedPhotoIndex: index }),

  selectReference: (index) => set({ selelectedReferenceIndex: index }),

  setDateRange: async (from, to) => {
    try {
      set({ photosLoading: true });
      const photos = await fetchPhotos(from, to);
      set({ photos, selectedPhotoIndex: 0 });
    } catch (e) {
      console.error("failed to fetch photos", e);
    } finally {
      set({ photosLoading: false });
    }
  },

  setTimeRange: (timeRange) => {
    set({ timeRange, selectedPhotoIndex: 0 });
  },

  init: async () => {
    const { fromDate, toDate } = get();
    try {
      set({ photosLoading: true, referencesLoading: true });
      const [photos, references] = await Promise.all([
        fetchPhotos(fromDate, toDate),
        fetchReferences(),
      ]);
      set({ photos, selectedPhotoIndex: 0, references });
    } catch (e) {
      console.error("failed to fetch photos", e);
    } finally {
      set({ photosLoading: false, referencesLoading: false });
    }
  },
}));

export function useFilteredPhotos(): Photo[] {
  const photos = useStore((state) => state.photos);
  const [fromHour, toHour] = useStore((state) => state.timeRange);
  return useMemo(() => {
    return photos.filter((p) => {
      const h = p.date.getHours();
      return h >= fromHour && h <= toHour;
    });
  }, [photos, fromHour, toHour]);
}

export function useCurrentPhoto(): Photo | undefined {
  const photos = useFilteredPhotos();
  const selectedPhotoIndex = useStore((state) => state.selectedPhotoIndex);
  return photos[selectedPhotoIndex];
}

export function useNextPhoto() {
  const photos = useFilteredPhotos();
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
