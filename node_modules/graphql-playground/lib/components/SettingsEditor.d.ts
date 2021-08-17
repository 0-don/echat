/// <reference types="react" />
import * as React from 'react';
export interface Props {
    value: string;
    onChange: (value: string) => void;
    onSave: () => void;
    isYaml?: boolean;
    isConfig?: boolean;
    readOnly?: boolean;
}
export default class SettingsEditor extends React.Component<Props, {}> {
    componentDidMount(): void;
    render(): JSX.Element;
    private handleKeydown;
}
