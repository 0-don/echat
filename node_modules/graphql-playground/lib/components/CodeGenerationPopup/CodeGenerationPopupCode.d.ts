/// <reference types="react" />
import * as React from 'react';
import { GraphQLClient, Environment } from '../../types';
export interface Props {
    query: string;
    endpointUrl: string;
    client: GraphQLClient;
    environment: Environment;
}
declare const _default: React.ComponentClass<Props>;
export default _default;
