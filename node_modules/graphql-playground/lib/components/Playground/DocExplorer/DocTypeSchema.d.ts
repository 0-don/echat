/// <reference types="react" />
export interface DocTypeSchemaProps {
    type: any;
    fields: any[];
    interfaces: any[];
    level: number;
    sessionId: string;
}
declare const DocTypeSchema: ({type, fields, interfaces, level, sessionId}: DocTypeSchemaProps) => JSX.Element;
export default DocTypeSchema;
