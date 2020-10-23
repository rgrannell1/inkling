import tap from 'tap';
import React from 'react';
import Inkling from '../src/index.js';
import split from 'split';
import through from 'through';
import { Text } from 'ink';
class TestApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            lines: [],
            presses: [],
            stdin: props.stdin,
            ttyIn: props.ttyIn
        };
    }
    storeStdin() {
        this.state.stdin
            .pipe(split())
            .pipe(through((line) => {
            this.setState({
                lines: this.state.lines.concat(line)
            });
        }))
            .on('end', () => { });
    }
    detectKeyboard() {
        this.state.ttyIn.on('keypress', (key) => {
            this.state.presses.push(key);
        });
    }
    componentDidMount() {
        this.storeStdin();
        this.detectKeyboard();
    }
}
class TestStdinApp extends TestApp {
    render() {
        let elems = this.state.lines.map((line) => {
            return React.createElement(Text, { key: line }, line);
        });
        return React.createElement(React.Fragment, null, elems);
    }
}
class TestKeyApp extends TestApp {
    render() {
        let elems = this.state.presses.map((key) => {
            return React.createElement(Text, { key: key }, key);
        });
        return React.createElement(React.Fragment, null, elems);
    }
}
const testStdinReadWrite = () => {
    const $app = new Inkling((data) => {
        return React.createElement(TestStdinApp, { stdin: data.stdin, ttyIn: data.ttyIn });
    });
    const message = 'a\nb\nc\nd';
    $app.stdin.write(`${message}\n`);
    tap.include($app.content(), message);
};
const testKeyDetection = () => {
    const $app = new Inkling((data) => {
        return React.createElement(TestKeyApp, { stdin: data.stdin, ttyIn: data.ttyIn });
    });
    for (const char of 'hello') {
        $app.press(char);
    }
};
testStdinReadWrite();
testKeyDetection();
//# sourceMappingURL=index.js.map