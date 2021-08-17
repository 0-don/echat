/// <reference types="react" />
import * as React from 'react';
import { Session } from '../../types';
export interface Props {
    session: Session;
    index: number;
    onSelectSession: (session: Session) => void;
    onCloseSession: (session: Session) => void;
    selectedSessionIndex: number;
    localTheme?: string;
}
export interface State {
    overCross: boolean;
}
export default class Tab extends React.PureComponent<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
    private handleMouseOverCross;
    private handleMouseOutCross;
    private handleSelectSession;
    private handleCloseSession;
}
