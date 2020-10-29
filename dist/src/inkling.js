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
    wait(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    waitUntil(pred, timeout = 10000) {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            let lastFrame = '';
            while (true) {
                lastFrame = this.lastFrame();
                let isMatch = pred(lastFrame);
                if (isMatch) {
                    return resolve();
                }
                else {
                    // -- throw an error if too long has passed
                    let elapsed = Date.now() - start;
                    if (elapsed > timeout) {
                        reject(`${elapsed}ms elapsed; test failed for \n${lastFrame}`);
                    }
                    // -- not great, but it will work for polling.
                    await new Promise(resolve => setTimeout(resolve, 250));
                }
            }
        });
    }
    press(data) {
        this.ttyIn.emit('keypress', data.sequence, data);
    }
    toStdin(lines) {
        lines.forEach(line => {
            this.stdin.write(`${line}\n`);
        });
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