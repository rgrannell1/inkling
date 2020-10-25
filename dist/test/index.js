import tap from 'tap';
import React from 'react';
import { Inkling, KeyPress } from '../src/inkling.js';
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
            this.setState({
                presses: this.state.presses.concat([key])
            });
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
    tap.include($app.lastFrame(), message);
};
const testKeyDetection = () => {
    const $app = new Inkling((data) => {
        return React.createElement(TestKeyApp, { stdin: data.stdin, ttyIn: data.ttyIn });
    });
    $app.press(new KeyPress('a'));
    $app.press(new KeyPress('b'));
    $app.press(new KeyPress('c'));
    $app.press(new KeyPress('d'));
    tap.includes($app.lastFrame(), 'a\nb\nc\nd');
};
testStdinReadWrite();
testKeyDetection();
//# sourceMappingURL=index.js.map