/// <reference types="react" />
import * as React from 'react';
export interface Props {
    rows: any[];
    fields: any[];
    rowCount: number;
    loadMoreRows: (settings: {
        startIndex: number;
        stopIndex: number;
    }) => void;
    onRowSelection: (input: {
        index: number;
    }) => void;
    scrollToIndex?: number;
}
export interface State {
    height: number;
    rowHeight: number;
    overscanRowCount: number;
    selectedRow: number;
}
export default class TableComponent extends React.Component<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
    private rowClassName;
    private noRowsRenderer;
    private rowGetter;
    private textToString(value);
    private isRowLoaded;
}
