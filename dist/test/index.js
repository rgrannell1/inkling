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
            stdin: props.stdin
        };
    }
    componentDidMount() {
        this.state.stdin
            .pipe(split())
            .pipe(through((line) => {
            this.setState({
                lines: this.state.lines.concat(line)
            });
        }))
            .on('end', () => { });
    }
    render() {
        let elems = this.state.lines.map((line) => {
            return React.createElement(Text, { key: line }, line);
        });
        return React.createElement(React.Fragment, null, elems);
    }
}
const testStdinReadWrite = () => {
    const $app = new Inkling((data) => {
        return React.createElement(TestApp, { stdin: data.stdin });
    });
    const message = 'a\nb\nc\nd';
    $app.stdin.write(`${message}\n`);
    tap.include($app.content(), message);
};
testStdinReadWrite();
//# sourceMappingURL=index.js.map