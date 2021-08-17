export interface Colours {
    green: string;
    darkBlue: string;
    darkBlue50: string;
    darkBlue60: string;
    darkBlue80: string;
    darkBlue30: string;
    darkBlue20: string;
    darkBlue10: string;
    darkerBlue: string;
    darkestBlue: string;
    white70: string;
    white60: string;
    white30: string;
    white20: string;
    white10: string;
    white: string;
    black40: string;
    paleText: string;
    paleGrey: string;
}
export declare const colours: Colours;
export interface Sizes {
    small6: string;
    small10: string;
    small12: string;
    small16: string;
    smallRadius: string;
    fontLight: string;
    fontSemiBold: string;
    fontTiny: string;
    fontSmall: string;
    fontMedium: string;
}
export declare const sizes: Sizes;
export interface Shorthands {
    [x: string]: any;
}
export declare const shorthands: Shorthands;
export interface ThemeInterface {
    mode: 'light' | 'dark';
    colours: Colours;
    sizes: Sizes;
    shorthands: Shorthands;
}
export declare const theme: ThemeInterface;
