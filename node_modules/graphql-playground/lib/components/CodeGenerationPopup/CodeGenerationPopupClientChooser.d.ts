/// <reference types="react" />
import { Environment } from '../../types';
export interface Props {
    environment: Environment;
    clients: string[];
    setClient: (env: any) => void;
    client: string;
}
declare const Chooser: (props: Props) => JSX.Element;
export default Chooser;
