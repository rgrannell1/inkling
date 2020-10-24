import type { ReactElement } from 'react';
import type { Instance as InkInstance } from 'ink';
interface GetComponentArgs {
    stdin: any;
    stderr: any;
    stdout: any;
    ttyIn: any;
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
    press(data: string): void;
    type(data: string): void;
    close(): void;
}
export {};
