import withTheme from './withTheme';
import ThemeProvider from './ThemeProvider';
declare type ThemeType = 'dark' | 'light';
interface LocalThemeInterface {
    localTheme: ThemeType;
}
interface OptionalLocalThemeInterface {
    localTheme?: ThemeType;
}
export { withTheme, ThemeProvider, ThemeType, LocalThemeInterface, OptionalLocalThemeInterface };
