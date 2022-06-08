import sub from 'date-fns/sub';
import { useMemo } from 'react';
import create from 'zustand';

import { fetchPhotos, fetchReferences } from './api';
import { Photo } from './types';
import filterPhotosByTime from './utils/filterPhotosByTime';

export interface State {
  dateRange: [fromDate: Date, toDate: Date];

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
  dateRange: [sub(new Date(), { days: 3 }), new Date()],
  timeRange: [6, 21], // reasonable default time range in summer

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
      const filtered = filterPhotosByTime(photos, get().timeRange);
      set({
        photos,
        selectedPhotoIndex: filtered.length - 1,
        dateRange: [from, to],
      });
    } catch (e) {
      console.error('failed to fetch photos', e);
    } finally {
      set({ photosLoading: false });
    }
  },

  setTimeRange: (timeRange) => {
    const filtered = filterPhotosByTime(get().photos, timeRange);
    set({ timeRange, selectedPhotoIndex: filtered.length - 1 });
  },

  init: async () => {
    const { dateRange, timeRange } = get();
    try {
      set({ photosLoading: true, referencesLoading: true });
      const [photos, references] = await Promise.all([
        fetchPhotos(...dateRange),
        fetchReferences(),
      ]);
      const filtered = filterPhotosByTime(photos, timeRange);
      set({ photos, selectedPhotoIndex: filtered.length - 1, references });
    } catch (e) {
      console.error('failed to fetch photos', e);
    } finally {
      set({ photosLoading: false, referencesLoading: false });
    }
  },
}));

export function useFilteredPhotos(): Photo[] {
  const photos = useStore((state) => state.photos);
  const timeRange = useStore((state) => state.timeRange);
  return useMemo(() => {
    return filterPhotosByTime(photos, timeRange);
  }, [photos, timeRange]);
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
    (state) => state.selelectedReferenceIndex,
  );
  const references = useStore((state) => state.references);
  return references[selelectedReferenceIndex];
}
