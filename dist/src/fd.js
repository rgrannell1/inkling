import { EventEmitter } from 'events';
import emitStream from 'emit-stream';
class Stdout extends EventEmitter {
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
    get rows() {
        return 25;
    }
    get columns() {
        return 50;
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
export const stubStdout = () => emitStream(new Stdout());
export const stubStderr = () => emitStream(new Stderr());
export const stubStdin = () => emitStream(new Stdin());
//# sourceMappingURL=fd.js.map