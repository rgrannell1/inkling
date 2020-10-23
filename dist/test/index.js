import React from 'react';
import Inkling from '../src/index.js';
import split from 'split';
import through from 'through';
import { Text } from 'ink';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: [],
            stdin: props.stdin
        };
    }
    componentDidMount() {
        return;
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
            return React.createElement(Text, null, line);
        });
        return React.createElement(React.Fragment, null, elems);
    }
}
const $app = new Inkling((data) => {
    return React.createElement(App, { stdin: data.stdin });
});
console.log($app.lastFrame());
//# sourceMappingURL=index.js.map