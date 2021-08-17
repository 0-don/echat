/// <reference types="react" />
/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import { GraphQLSchema } from 'graphql';
/**
 * QueryEditor
 *
 * Maintains an instance of CodeMirror responsible for editing a GraphQL query.
 *
 * Props:
 *
 *   - schema: A GraphQLSchema instance enabling editor linting and hinting.
 *   - value: The text of the editor.
 *   - onEdit: A function called when the editor changes, given the edited text.
 *
 */
export interface Props {
    schema?: GraphQLSchema | null;
    value: string;
    onEdit?: (value: string) => void;
    onHintInformationRender?: (elem: any) => void;
    onRunQuery?: () => void;
    placeholder?: string;
    readOnly?: boolean;
    hideLineNumbers?: boolean;
    disableAutofocus?: boolean;
    hideGutters?: boolean;
    useVim?: boolean;
}
export declare class QueryEditor extends React.Component<Props, {}> {
    private cachedValue;
    private editor;
    private ignoreChangeEvent;
    private node;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    setRef: (ref: any) => void;
    /**
     * Public API for retrieving the CodeMirror instance from this
     * React component.
     */
    getCodeMirror(): any;
    /**
     * Public API for retrieving the DOM client height for this component.
     */
    getClientHeight(): any;
    private onKeyUp;
    private onEdit;
    /**
     * Render a custom UI for CodeMirror's hint which includes additional info
     * about the type and description for the selected context.
     */
    private onHasCompletion;
}
