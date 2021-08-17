/// <reference types="react" />
import * as React from 'react';
import { Session } from '../../types';
import { OptionalLocalThemeInterface } from '../Theme';
export interface Props extends OptionalLocalThemeInterface {
    sessions: Session[];
    selectedSessionIndex: number;
    onNewSession: any;
    onCloseSession: (session: Session) => void;
    onSelectSession: (session: Session) => void;
    isApp?: boolean;
}
export declare const TabBar: React.ComponentClass<Props>;
