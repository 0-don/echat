/// <reference types="react" />
import * as React from 'react';
export interface Props {
    onClick: () => void;
}
export default class Settings extends React.Component<Props, {}> {
    render(): JSX.Element;
}
