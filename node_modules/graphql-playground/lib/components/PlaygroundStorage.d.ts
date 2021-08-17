import { Session } from '../types';
export default class PlaygroundStorage {
    static countCache: {
        [endpoint: string]: number;
    };
    static getSessionCount(endpoint: string): number;
    private static runMigration(project, migrationEndpoint);
    project: any;
    private endpoint;
    private storages;
    private executedQueryCount;
    constructor(endpoint: string);
    executedQuery(): void;
    hasExecutedQuery(): boolean;
    getSessionStorage(sessionId: string): any;
    setState(project: any, endpoint: string): void;
    getSessions(): any[];
    removeSession(session: Session): void;
    saveSession(session: Session, save?: boolean): void;
    syncHistory(history: Session[]): void;
    addToHistory(session: Session): void;
    getHistory(endpoint?: string): any;
    setItem(key: string, value: string): void;
    getItem(key: string): any;
    saveProject(): void;
    private getProject();
    private getExecutedQueryCount();
}
