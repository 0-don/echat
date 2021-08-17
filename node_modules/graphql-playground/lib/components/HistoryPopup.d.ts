/// <reference types="react" />
import * as React from 'react';
import { HistoryFilter, Session } from '../types';
import { SchemaFetcher } from './Playground/SchemaFetcher';
export interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    historyItems: Session[];
    onItemStarToggled: (item: Session) => void;
    fetcherCreater: (item: any, params: any) => Promise<any>;
    onCreateSession: (session: Session) => void;
    schemaFetcher: SchemaFetcher;
}
export interface State {
    selectedFilter: HistoryFilter;
    selectedItemIndex: number;
    searchTerm: string;
}
declare const _default: React.ComponentClass<Props>;
export default _default;
