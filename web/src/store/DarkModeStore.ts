// export default 0
import { immer } from '../utils/immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type DarkMode = {
  hasHydrated: boolean;
  theme: boolean;
  changeTheme: () => void;
  startTheme: () => void;
};

const useDarkModeStore = create<DarkMode>(
  persist(
    immer(
      (set): DarkMode => ({
        hasHydrated: false,
        theme: true,
        changeTheme: () =>
          set((state) => {
            if (!state.theme) {
              state.theme = true;
              document.querySelector('html')?.classList?.add?.('dark');
            } else {
              state.theme = false;
              document.querySelector('html')?.classList?.remove?.('dark');
            }
          }),
        startTheme: () =>
          set((state) => {
            state.hasHydrated = true;

            if (state.theme) {
              document.querySelector('html')?.classList?.add?.('dark');
            } else {
              document.querySelector('html')?.classList?.remove?.('dark');
            }
          }),
      })
    ),
    {
      name: 'DarkMode',
      serialize: (state) => JSON.stringify(state),
      deserialize: (storedState) => JSON.parse(storedState),
      blacklist: ['hasHydrated'],
    }
  )
);

export default useDarkModeStore;
