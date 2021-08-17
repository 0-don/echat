/// <reference types="react" />
import * as React from 'react';
import { Environment, GraphQLClient } from '../../types';
export interface Props {
    query: string;
    isOpen: boolean;
    onRequestClose: () => void;
    endpointUrl: string;
}
export interface State {
    selectedClient: GraphQLClient;
    selectedEnv: Environment;
}
declare const _default: React.ComponentClass<Props>;
export default _default;
