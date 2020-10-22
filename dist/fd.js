import { EventEmitter } from 'events';
export class Stdout extends EventEmitter {
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
export class Stdin extends EventEmitter {
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
export class Stderr extends EventEmitter {
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
//# sourceMappingURL=fd.js.map