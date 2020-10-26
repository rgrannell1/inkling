
import tap from 'tap'
import React from 'react'
import {
  Inkling,
  KeyPress
} from '../src/inkling.js'
import split from 'split'
import through from 'through'
import { Text } from 'ink'

interface TtyIn {
  on: Function
}

interface AppArgs {
  stdin: any,
  ttyIn: TtyIn
}

abstract class TestApp extends React.Component<any,any> {
  constructor (props:AppArgs) {
    super(props)

    this.state = {
      id: 0,
      lines: [],
      presses: [],
      stdin: props.stdin,
      ttyIn: props.ttyIn
    }
  }
  storeStdin () {
    this.state.stdin
      .pipe(split())
      .pipe(through((line:string) => {
        this.setState({
          lines: this.state.lines.concat(line)
        })
      }))
      .on('end', () => { })
  }
  detectKeyboard () {
    this.state.ttyIn.on('keypress', (key:string) => {
      this.setState({
        presses: this.state.presses.concat([key])
      })
    })
  }
  componentDidMount () {
    this.storeStdin()
    this.detectKeyboard()
  }
}

class TestStdinApp extends TestApp {
  render () {
    let elems = this.state.lines.map((line:string) => {
      return <Text key={line}>{line}</Text>
    })

    return <>{elems}</>
  }
}

class TestKeyApp extends TestApp {
  render () {
    let elems = this.state.presses.map((key:string) => {
      return <Text key={key}>{key}</Text>
    })

    return <>{elems}</>
  }
}

const testStdinReadWrite = async () => {
  const $app = new Inkling((data:any) => {
    return <TestStdinApp stdin={data.stdin} ttyIn={data.ttyIn}/>
  })

  const message = 'a\nb\nc\nd'
  $app.stdin.write(`${message}\n`)

  await $app.waitUntil((frame:string) => {
    return frame.includes(message)
  })

  tap.include($app.lastFrame(), message)
}

const testKeyDetection = () => {
  const $app = new Inkling((data:any) => {
    return <TestKeyApp stdin={data.stdin} ttyIn={data.ttyIn}/>
  })

  $app.press(new KeyPress('a'))
  $app.press(new KeyPress('b'))
  $app.press(new KeyPress('c'))
  $app.press(new KeyPress('d'))

  tap.includes($app.lastFrame(), 'a\nb\nc\nd')
}

testStdinReadWrite()
testKeyDetection()
