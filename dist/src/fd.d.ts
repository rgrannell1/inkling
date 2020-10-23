/// <reference types="node" />
import { StubStdout } from './types';
import events from 'events';
import through from 'through';
interface StdoutArgs {
    rows: number;
    columns: number;
}
export declare const stubStdout: (args: StdoutArgs) => StubStdout & {
    readonly columns: number;
    readonly rows: number;
    lastFrame(): string | undefined;
    frames(): string[] | undefined;
};
export declare class TTYIn extends events.EventEmitter {
    isTTY: boolean;
    press(data: string): void;
    setEncoding(): void;
    setRawMode(): void;
    resume(): void;
    pause(): void;
}
export declare const stubStderr: () => through.ThroughStream;
export declare const stubStdin: () => through.ThroughStream;
export declare const stubTtyIn: () => TTYIn;
export {};
