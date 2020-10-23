import { render as inkRender } from 'ink';
import { stubStdin, stubStderr, stubStdout } from './fd.js';
export default class Inkling {
    constructor(getComponent) {
        this.stdout = stubStdout();
        this.stdin = stubStdin();
        this.stderr = stubStderr();
        const tree = getComponent({
            stdin: this.stdin,
            stdout: this.stdout,
            stderr: this.stderr
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
    lastFrame() {
        return this.stdout.lastFrame();
    }
}
//# sourceMappingURL=index.js.map