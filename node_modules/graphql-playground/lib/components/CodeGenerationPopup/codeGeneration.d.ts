import { GraphQLClient, Environment } from '../../types';
export declare class CodeGenerator {
    private client;
    private environment;
    private endpointUrl;
    constructor(client: GraphQLClient, environment: Environment, endpointUrl: string);
    getSetup(): string;
    getCode(query: string): string;
    private getTransport();
    private getImports();
    private getQueryCode(query);
    private getQuery(query);
    private getFetchBody(query);
    private getMutation(query);
}
