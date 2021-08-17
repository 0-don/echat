/// <reference types="react" />
import * as React from 'react';
import { SharingProps } from '../../Share';
import { StyledComponentClass } from 'styled-components';
export interface Props {
    endpoint: string;
    onChangeEndpoint?: (value: string) => void;
    endpointDisabled: boolean;
    onClickPrettify?: () => void;
    onClickHistory?: () => void;
    curl: string;
    onClickShare?: () => void;
    onReloadSchema?: () => void;
    sharing?: SharingProps;
    fixedEndpoint?: boolean;
}
export default class TopBar extends React.Component<Props, {}> {
    render(): JSX.Element;
    onChange: (e: any) => void;
    onKeyDown: (e: any) => void;
}
export declare const Button: StyledComponentClass<any, any, any>;
