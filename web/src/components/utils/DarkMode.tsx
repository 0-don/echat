import useDarkModeStore from '../../store/DarkModeStore';
import { SwitchField } from '../htmlElements';

export const DarkMode: React.FC = () => {
  const { theme, hasHydrated, changeTheme } = useDarkModeStore();
  return <SwitchField checked={hasHydrated && theme} onChange={changeTheme} />;
};
