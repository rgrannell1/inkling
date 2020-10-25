import type { ReactElement } from 'react';
import type { Instance as InkInstance } from 'ink';
interface GetComponentArgs {
    stdin: any;
    stderr: any;
    stdout: any;
    ttyIn: any;
}
declare type GetComponent = (data: GetComponentArgs) => ReactElement;
export declare class Inkling {
    instance: InkInstance;
    stdin: any;
    stdout: any;
    stderr: any;
    ttyIn: any;
    constructor(getComponent: GetComponent);
    frames(): any;
    lastFrame(): any;
    press(data: KeyPress): void;
    close(): void;
}
export declare class KeyPress {
    name?: string;
    sequence?: string;
    meta?: boolean;
    ctrl?: boolean;
    shift?: boolean;
    constructor(name: string);
    static ESCAPE: KeyPress;
}
export {};
