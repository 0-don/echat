/// <reference types="react" />
export interface Props {
    hideArrow?: boolean;
    primary?: boolean;
    button?: boolean;
    green?: boolean;
    white?: boolean;
    gray?: boolean;
    greenOnWhite?: boolean;
    arrowToBottom?: boolean;
    arrowToLeft?: boolean;
    children?: any;
    className?: string;
    wrap?: boolean;
    onClick?: (e?: any) => void;
}
export declare function A({hideArrow, primary, button, green, white, gray, greenOnWhite, arrowToBottom, arrowToLeft, children, className, wrap, onClick}: Props): JSX.Element;
export declare function Button({hideArrow, primary, green, white, greenOnWhite, arrowToBottom, arrowToLeft, children, className, wrap, onClick}: Props): JSX.Element;
