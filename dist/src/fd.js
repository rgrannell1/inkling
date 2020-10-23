import { EventEmitter } from 'events';
import through from 'through';
const emitStream = (emitter) => {
    return emitter;
};
class Stdout extends EventEmitter {
    constructor(args) {
        super(args);
        this.frames = [];
        this.write = (frame) => {
            this.frames.push(frame);
            this._lastFrame = frame;
        };
        this.lastFrame = () => {
            return this._lastFrame;
        };
        this.rows = args.rows;
        this.columns = args.columns;
    }
}
class Stdin extends EventEmitter {
    constructor() {
        super(...arguments);
        this.isTTY = true;
    }
    write(data) {
        this.emit('data', data);
    }
    setEncoding() { }
    setRawMode() { }
    result() { }
    pause() { }
    pipe(stream) {
    }
}
class Stderr extends EventEmitter {
    constructor() {
        super(...arguments);
        this.frames = [];
        this.write = (frame) => {
            this.frames.push(frame);
            this._lastFrame = frame;
        };
        this.lastFrame = () => {
            return this._lastFrame;
        };
    }
}
export const stubStdout = (args) => {
    const ref = through(function write(data) {
        this.queue(data);
        ref._lastFrame = data;
    });
    ref.lastFrame = () => ref._lastFrame;
    return ref;
};
export const stubStderr = () => {
    return through();
};
export const stubStdin = () => {
    return through();
};
//# sourceMappingURL=fd.js.map