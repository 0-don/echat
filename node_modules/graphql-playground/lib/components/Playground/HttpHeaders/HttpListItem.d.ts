/// <reference types="react" />
import * as React from 'react';
import { Header } from './HttpHeaders';
export interface Props {
    header: Header;
    index: number;
    onChange: (index: number, Header) => void;
    onDelete: (index: number) => void;
}
export interface State {
    name: string;
    value: string;
    editing: boolean;
}
export default class HttpListItem extends React.Component<Props, State> {
    private inputRef;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
    private setRef;
    private handleKeyDown;
    private handleEditChange;
    private handleValidate;
    private handleDelete;
}
