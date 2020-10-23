import through from 'through';
export interface StubStdout extends through.ThroughStream {
    lastFrame?(): string | undefined;
    frames?(): string[] | undefined;
    _lastFrame?: string;
    _frames?: string[];
    rows?: number;
    columns?: number;
}
