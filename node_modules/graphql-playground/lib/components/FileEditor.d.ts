/// <reference types="react" />
import * as React from 'react';
export interface Props {
    value: string;
    onChange: (value: string) => void;
}
export default class FileEditor extends React.Component<Props, {}> {
    render(): JSX.Element;
}
