/// <reference types="react" />
export interface Props {
    onPrettify: any;
    showEndpoints?: boolean;
    showQueryTitle?: boolean;
}
declare const QueryHeader: ({onPrettify, showQueryTitle}: Props) => JSX.Element;
export default QueryHeader;
