/// <reference types="react" />
import * as React from 'react';
export interface Props {
    isShown: boolean;
    onSearch: (value: string) => void;
    placeholder?: string;
    clean?: boolean;
}
export interface State {
    value: string;
}
export default class SearchBox extends React.Component<Props, State> {
    private debouncedOnSearch;
    constructor(props: any);
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
    handleChange: (event: any) => void;
}
