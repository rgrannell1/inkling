import { render as inkRender } from 'ink';
import { Stdin, Stderr, Stdout } from './fd.js';
class Inkling {
    constructor(tree) {
        const stdout = new Stdout();
        const stdin = new Stdin();
        const stderr = new Stderr();
        this.instance = inkRender(tree, {
            stdout: stdout,
            stdin: stdin,
            stderr: stderr,
            debug: true,
            exitOnCtrlC: true,
            patchConsole: false
        });
    }
}
//# sourceMappingURL=index.js.map