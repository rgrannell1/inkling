import { render as inkRender } from 'ink';
import { stubStdin, stubStderr, stubStdout, stubTtyIn } from './fd.js';
export class Inkling {
    constructor(getComponent) {
        this.stdout = stubStdout({
            rows: 25,
            columns: 100
        });
        this.stdin = stubStdin();
        this.stderr = stubStderr();
        this.ttyIn = stubTtyIn();
        const tree = getComponent({
            stdin: this.stdin,
            stdout: this.stdout,
            stderr: this.stderr,
            ttyIn: this.ttyIn
        });
        this.instance = inkRender(tree, {
            stdout: this.stdout,
            stdin: this.stdin,
            stderr: this.stderr,
            debug: true,
            exitOnCtrlC: false,
            patchConsole: false
        });
    }
    frames() {
        return this.stdout?.frames();
    }
    lastFrame() {
        return this.stdout.lastFrame();
    }
    waitUntil(pred, timeout = 10000) {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            while (true) {
                if (pred(this.lastFrame())) {
                    resolve();
                }
                else {
                    let elapsed = Date.now() - start;
                    if (elapsed > timeout) {
                        reject(`${elapsed} elapsed`);
                    }
                    // -- not great, but it will work for polling.
                    await new Promise(resolve => {
                        setTimeout(resolve, 100);
                    });
                }
            }
        });
    }
    press(data) {
        this.ttyIn.emit('keypress', data.sequence, data);
    }
    close() {
        this.instance.unmount();
        this.instance.cleanup();
        this.stdout.emit('end');
        this.stdin.emit('end');
        this.stderr.emit('end');
        this.ttyIn.emit('end');
    }
}
export class KeyPress {
    constructor(name) {
        this.name = name;
        this.sequence = name;
        this.meta = false;
        this.ctrl = false;
        this.shift = false;
    }
}
KeyPress.ESCAPE = new KeyPress('escape');
//# sourceMappingURL=inkling.js.map