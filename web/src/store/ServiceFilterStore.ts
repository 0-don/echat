import { immer } from '../utils/immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterUserServiceQueryVariables } from 'src/generated/graphql';

type Form = {
  hasHydrated: boolean;
  filterQuery: FilterUserServiceQueryVariables;
  setSlug: (slug: string) => void;
  setCursor: (cursor: string | undefined) => void;
  filterInit: (filterOptions: FilterUserServiceQueryVariables) => void;
};

const useServiceFilterStore = create<Form>(
  persist(
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
        filterInit: (filterOptions) =>
          set((state) => {
            state.hasHydrated = true;
            // if (!state.filterQuery.slug) {
            //   state.filterQuery = filterOptions;
            // }
            state.filterQuery = filterOptions;
          }),
      })
    ),
    {
      name: 'ServiceFilter',
      serialize: (state) => JSON.stringify(state),
      deserialize: (storedState) => JSON.parse(storedState),
      blacklist: ['hasHydrated'],
    }
  )
);
export default useServiceFilterStore;
