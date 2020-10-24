import type { ReactElement } from 'react';
import type { Instance as InkInstance } from 'ink';
interface GetComponentArgs {
    stdin: any;
    stderr: any;
    stdout: any;
    ttyIn: any;
}
interface KeyPress {
    ctrl: Boolean;
    meta: Boolean;
    shift: Boolean;
    sequence: string;
    name: string | undefined;
}
declare type GetComponent = (data: GetComponentArgs) => ReactElement;
export default class Inkling {
    instance: InkInstance;
    stdin: any;
    stdout: any;
    stderr: any;
    ttyIn: any;
    constructor(getComponent: GetComponent);
    frames(): any;
    lastFrame(): any;
    press(data: KeyPress): void;
    type(data: string): void;
    close(): void;
}
export {};
