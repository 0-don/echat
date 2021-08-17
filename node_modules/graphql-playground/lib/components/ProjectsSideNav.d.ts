/// <reference types="react" />
import * as React from 'react';
import { GraphQLConfig } from '../graphqlConfig';
export interface Props {
    config: GraphQLConfig;
    folderName: string;
    theme: string;
    activeEnv: string;
    onSelectEnv: (endpoint: string, projectName?: string) => void;
    onNewWorkspace?: () => void;
    showNewWorkspace: boolean;
    isElectron: boolean;
    onEditConfig: () => void;
    getSessionCount: (endpoint: string) => number;
    activeProjectName?: string;
}
export default class ProjectsSideNav extends React.Component<Props, {}> {
    render(): JSX.Element;
    private renderEndpoints(endpoints, projectName?);
}
