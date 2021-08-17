/// <reference types="react" />
import { Environment } from '../../types';
export interface Props {
    environment: Environment;
    setEnvironment: (data: any) => void;
}
declare const Chooser: (props: Props) => JSX.Element;
export default Chooser;
