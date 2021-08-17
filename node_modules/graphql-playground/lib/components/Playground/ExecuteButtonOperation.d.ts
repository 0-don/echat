/// <reference types="react" />
import * as React from 'react';
export interface Props {
    operation: any;
    onMouseOver: (operation: any) => void;
    onMouseOut: () => void;
    onMouseUp: (operation: any) => void;
    highlight: any;
}
export default class ExecuteButtonOperation extends React.Component<Props, {}> {
    render(): JSX.Element;
    private handleMouseOver;
    private handleMouseOut;
    private handleMouseUp;
}
