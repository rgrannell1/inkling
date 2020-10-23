import events from 'events';
import through from 'through';
export const stubStdout = (args) => {
    const ref = through(function write(data) {
        this.queue(data);
        ref._lastFrame = data;
    });
    return Object.assign(ref, {
        get columns() {
            return args.columns;
        },
        get rows() {
            return args.rows;
        },
        lastFrame() {
            return ref._lastFrame;
        }
    });
};
export class TTYIn extends events.EventEmitter {
    constructor() {
        super(...arguments);
        this.isTTY = true;
    }
    press(data) {
        this.emit('keypress', data);
    }
    setEncoding() { }
    setRawMode() { }
    resume() { }
    pause() { }
}
export const stubStderr = () => {
    return through();
};
export const stubStdin = () => {
    return through();
};
export const stubTtyIn = () => {
    return new TTYIn();
};
//# sourceMappingURL=fd.js.map