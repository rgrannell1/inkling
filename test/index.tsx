
import React from 'react'
import Inkling from '../src/index.js'
import split from 'split'
import through from 'through'
import { Text } from 'ink'

interface AppArgs {
  stdin: any
}

class App extends React.Component<any,any> {
  constructor (props:AppArgs) {
    super(props)

    this.state = {
      lines: [],
      stdin: props.stdin
    }
  }
  componentDidMount () {
    this.state.stdin
      .pipe(split())
      .pipe(through((line:string) => {
        this.setState({
          lines: this.state.lines.concat(line)
        })
      }))
      .on('end', () => { })
  }
  render () {
    let elems = this.state.lines.map((line:string) => {
      return <Text>{line}</Text>
    })

    return <>{elems}</>
  }
}

const $app = new Inkling((data:any) => {
  return <App stdin={data.stdin}/>
})

console.log($app.content())
