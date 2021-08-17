/// <reference types="react" />
import * as React from 'react';
export declare class Theme {
    theme: string;
    subscriptions: any[];
    constructor(theme: string);
    setTheme(theme: any): void;
    subscribe(f: any): void;
    unsubscribe(f: any): void;
}
export interface ThemeProviderProps {
    theme: string;
}
export default class ThemeProvider extends React.PureComponent<ThemeProviderProps, {}> {
    static childContextTypes: {
        localTheme: any;
    };
    private theme;
    constructor(p: any, c: any);
    componentWillReceiveProps(next: any): void;
    getChildContext(): {
        localTheme: Theme;
    };
    render(): any;
}
