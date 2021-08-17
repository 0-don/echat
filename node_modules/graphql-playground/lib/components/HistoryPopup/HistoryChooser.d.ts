/// <reference types="react" />
import { HistoryFilter } from '../../types';
export interface Props {
    selectedFilter: HistoryFilter;
    onSelectFilter: (filter: any) => void;
}
declare const HistoryChooser: ({selectedFilter, onSelectFilter}: Props) => JSX.Element;
export default HistoryChooser;
