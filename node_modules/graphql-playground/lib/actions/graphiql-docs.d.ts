export declare type ADD_STACK = 'add stack';
export declare const ADD_STACK: ADD_STACK;
export declare type SET_STACKS = 'set stacks';
export declare const SET_STACKS: SET_STACKS;
export declare type TOOGLE_DOCS = 'toggle docs';
export declare const TOOGLE_DOCS: TOOGLE_DOCS;
export declare type CHANGE_KEY_MOVE = 'change key move';
export declare const CHANGE_KEY_MOVE: CHANGE_KEY_MOVE;
export declare type CHANGE_WIDTH_DOCS = 'change width docs';
export declare const CHANGE_WIDTH_DOCS: CHANGE_WIDTH_DOCS;
export interface AddStackAction {
    type: ADD_STACK;
    sessionId: string;
    field: any;
    x: number;
    y: number;
}
export interface SetStacksAction {
    type: SET_STACKS;
    sessionId: string;
    stacks: any[];
}
export interface ToggleDocsAction {
    type: TOOGLE_DOCS;
    sessionId: string;
    open?: boolean;
}
export interface ChangeWidthDocsAction {
    type: CHANGE_WIDTH_DOCS;
    sessionId: string;
    width: number;
}
export interface ChangeKeyMoveAction {
    type: CHANGE_KEY_MOVE;
    sessionId: string;
    move: boolean;
}
export declare const setStacks: (sessionId: string, stacks: any[]) => SetStacksAction;
export declare const addStack: (sessionId: string, field: any, x: number, y: number) => AddStackAction;
export declare const toggleDocs: (sessionId: string, open: boolean) => ToggleDocsAction;
export declare const changeWidthDocs: (sessionId: string, width: number) => ChangeWidthDocsAction;
export declare const changeKeyMove: (sessionId: string, move: boolean) => ChangeKeyMoveAction;
