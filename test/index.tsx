
import tap from 'tap'
import React from 'react'
import Inkling from '../src/index.js'
import split from 'split'
import through from 'through'
import { Text } from 'ink'

interface AppArgs {
  stdin: any
}

class TestApp extends React.Component<any,any> {
  constructor (props:AppArgs) {
    super(props)

    this.state = {
      id: 0,
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
      return <Text key={line}>{line}</Text>
    })

    return <>{elems}</>
  }
}


const testStdinReadWrite = () => {
  const $app = new Inkling((data:any) => {
    return <TestApp stdin={data.stdin}/>
  })

  const message = 'a\nb\nc\nd'
  $app.stdin.write(`${message}\n`)

  tap.include($app.content(), message)
}

testStdinReadWrite()
