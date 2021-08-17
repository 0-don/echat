/// <reference types="react" />
import { HistoryFilter } from '../../types';
export interface Props {
    selectedFilter: HistoryFilter;
    onSelectFilter: (filter: any) => void;
    onSearch: (value: string) => void;
}
declare const HistoryHeader: (props: Props) => JSX.Element;
export default HistoryHeader;
