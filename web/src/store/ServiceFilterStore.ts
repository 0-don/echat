import { immer } from '../utils/immer';
import create from 'zustand';
import {
  FilterOptions,
  FilterUserServiceQueryVariables,
} from 'src/generated/graphql';

type Form = {
  hasHydrated: boolean;
  filterQuery: FilterUserServiceQueryVariables;
  setSlug: (slug: string) => void;
  setCursor: (cursor: string | undefined) => void;
  setOptions: (filterOptions: FilterOptions) => void;
  filterInit: (filterOptions: FilterUserServiceQueryVariables) => void;
};

const useServiceFilterStore = create<Form>(
  immer(
    (set): Form => ({
      hasHydrated: false,
      filterQuery: {
        slug: '',
        limit: 20,
      },
      setSlug: (slug) =>
        set((state) => {
          state.filterQuery.slug = slug;
        }),
      setCursor: (cursor) =>
        set((state) => {
          state.filterQuery.cursor = cursor;
        }),
      setOptions: (filterOptions) =>
        set((state) => {
          state.filterQuery.filterOptions = filterOptions;
        }),
      filterInit: (filterOptions) =>
        set((state) => {
          state.hasHydrated = true;
          state.filterQuery = filterOptions;
        }),
    })
  )
);
export default useServiceFilterStore;
