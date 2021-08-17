/// <reference types="react" />
import * as React from 'react';
import { Response } from '../Playground';
export interface Props {
    disableResize?: boolean;
    setRef: (ref: any) => void;
    hideGutters?: boolean;
    responses: Response[];
}
export default class Results extends React.Component<Props, {}> {
    render(): JSX.Element;
}
