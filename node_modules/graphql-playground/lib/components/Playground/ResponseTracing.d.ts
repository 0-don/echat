/// <reference types="react" />
import * as React from 'react';
export interface TracingFormat {
    version: 1;
    startTime: string;
    endTime: string;
    duration: number;
    execution: {
        resolvers: Array<{
            path: Array<string | number>;
            parentType: string;
            fieldName: string;
            returnType: string;
            startOffset: number;
            duration: number;
        }>;
    };
}
export interface Props {
    tracing?: TracingFormat;
    tracingSupported?: boolean;
    startTime?: Date;
    endTime?: Date;
}
export default class ResponseTracing extends React.Component<Props, {}> {
    render(): JSX.Element;
}
