/// <reference types="react" />
import * as React from 'react';
export interface Header {
    name: string;
    value: string;
}
export interface Props {
    headers?: Header[];
    onChange?: (headers: Header[]) => void;
}
export interface State {
    open: boolean;
    newHeader: boolean;
}
declare class HttpHeaders extends React.PureComponent<Props, State> {
    static defaultProps: {
        headers: never[];
    };
    constructor(props: any);
    render(): JSX.Element;
    private handleToggle;
    private handleClickNewHeader;
    private handleChange;
    private handleDelete;
}
export default HttpHeaders;
