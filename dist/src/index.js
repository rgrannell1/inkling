import { render as inkRender } from 'ink';
import { stubStdin, stubStderr, stubStdout, stubTtyIn } from './fd.js';
export default class Inkling {
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
    press(data) {
        this.ttyIn.emit('keypress', data);
    }
    type(data) {
        for (const char of data) {
            // -- events aren't necessarily ordered.
            this.ttyIn.emit('keypress', char);
        }
    }
    rerender() {
    }
}
//# sourceMappingURL=index.js.map