import tap from 'tap';
import * as fd from '../src/fd.js';
const testStderr = async () => {
    const stream = fd.stubStderr();
    stream.write('test');
    const text = await new Promise(resolve => {
        stream.on('data', (data) => {
            resolve(data);
        });
    });
    tap.equal(text, 'test');
};
const testStdin = async () => {
    const stream = fd.stubStdin();
    stream.write('test');
    const text = await new Promise(resolve => {
        stream.on('data', (data) => {
            resolve(data);
        });
    });
    tap.equal(text, 'test');
};
const testStdout = async () => {
    const stream = fd.stubStdout({
        columns: 100,
        rows: 20
    });
    stream.write('test');
    const text = await new Promise(resolve => {
        stream.on('data', (data) => {
            resolve(data);
        });
    });
    tap.equal(text, 'test');
    tap.equals(stream.columns, 100);
    tap.equals(stream.rows, 20);
};
const testTtyIn = async () => {
    const stream = fd.stubTtyIn();
    stream.press('a');
    const char = await new Promise(resolve => {
        stream.on('keypress', (char) => {
            resolve(char);
        });
    });
    tap.equal(char, 'a');
};
testStderr();
testStdin();
testStdout();
testTtyIn();
//# sourceMappingURL=fd.js.map