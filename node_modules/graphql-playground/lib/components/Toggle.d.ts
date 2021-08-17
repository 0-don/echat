/// <reference types="react" />
export interface ToggleProps {
    choices: string[];
    onChange: (choice: string, i: number) => void;
    activeChoice: string;
}
export default function Toggle({choices, onChange, activeChoice}: ToggleProps): JSX.Element;
