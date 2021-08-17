/// <reference types="react" />
import * as React from 'react';
export interface Props {
    onOpenCodeGeneration: () => void;
}
export interface State {
    open: boolean;
}
export default class GenerateCodeButton extends React.Component<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
    private toggleTooltip;
}
