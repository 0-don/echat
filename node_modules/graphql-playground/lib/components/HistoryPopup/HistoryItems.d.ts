/// <reference types="react" />
import { Session } from '../../types';
export interface Props {
    items: Session[];
    selectedItemIndex: number;
    onItemSelect: (index: number) => void;
    onItemStarToggled: (item: Session) => void;
    searchTerm: string;
}
declare const HistoryItems: ({items, onItemSelect, selectedItemIndex, onItemStarToggled}: Props) => JSX.Element;
export default HistoryItems;
