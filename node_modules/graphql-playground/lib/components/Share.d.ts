/// <reference types="react" />
import * as React from 'react';
import { LocalThemeInterface } from './Theme';
export interface SharingProps extends LocalThemeInterface {
    allTabs: boolean;
    httpHeaders: boolean;
    history: boolean;
    onToggleAllTabs: () => void;
    onToggleHttpHeaders: () => void;
    onToggleHistory: () => void;
    onShare: () => void;
    shareUrl?: string;
    reshare: boolean;
    isSharingAuthorization: boolean;
    children?: any;
}
export interface State {
    open: boolean;
}
export default class Share extends React.Component<SharingProps, State> {
    constructor(props: any);
    render(): JSX.Element;
    private renderAuthSharingWarning;
    private toggleTooltip;
}
