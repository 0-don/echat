import useDarkModeStore from '../../store/DarkModeStore';
import { useEffect } from 'react';
import { SwitchField } from '../htmlElements';

export const DarkModeSwitch: React.FC = () => {
  const { theme, hasHydrated, changeTheme, startTheme } = useDarkModeStore();

  useEffect(() => {
    startTheme();
  }, []);

  return (
    <SwitchField
      checked={hasHydrated && theme}
      onChange={changeTheme}
      icons={['🌙', '☀️']}
    />
  );
};
