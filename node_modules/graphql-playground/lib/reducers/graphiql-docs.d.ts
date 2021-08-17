import { AddStackAction, ChangeKeyMoveAction, ChangeWidthDocsAction, SetStacksAction, ToggleDocsAction } from '../actions/graphiql-docs';
import { GraphQLField } from 'graphql';
export declare type GraphiqlDocsAction = AddStackAction | ToggleDocsAction | ChangeWidthDocsAction | ChangeKeyMoveAction | SetStacksAction;
export interface DocsState {
    [sessionId: string]: SessionState;
}
export interface NavItem {
    x: number;
    y: number;
    field: GraphQLField<any, any>;
}
export interface SessionState {
    readonly navStack: NavItem[];
    readonly docsOpen: boolean;
    readonly docsWidth: number;
    readonly keyMove: boolean;
}
export declare const defaultSessionState: SessionState;
export default function graphiqlDocsReducer(state: DocsState | undefined, action: GraphiqlDocsAction): {
    [x: string]: SessionState | {
        navStack: any[];
        docsOpen: boolean;
        docsWidth: number;
        keyMove: boolean;
    };
};
