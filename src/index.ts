
import type {ReactElement} from 'react'
import {render as inkRender} from 'ink'
import type {Instance as InkInstance} from 'ink'

import {
  stubStdin,
  stubStderr,
  stubStdout,
  stubTtyIn
} from './fd.js'

interface GetComponentArgs {
  stdin: any,
  stderr: any,
  stdout: any,
  ttyIn: any
}

type GetComponent = (data:GetComponentArgs) => ReactElement

export default class Inkling {
  instance:InkInstance
  stdin:any
  stdout:any
  stderr:any
  ttyIn:any
  constructor (getComponent:GetComponent) {
    this.stdout = stubStdout({
      rows: 25,
      columns: 100
    })
    this.stdin = stubStdin()
    this.stderr = stubStderr()
    this.ttyIn = stubTtyIn()

    const tree = getComponent({
      stdin: this.stdin,
      stdout: this.stdout,
      stderr: this.stderr,
      ttyIn: this.ttyIn
    })

    this.instance = inkRender(tree, {
      stdout: this.stdout as any,
      stdin: this.stdin as any,
      stderr: this.stderr as any,
      debug: true,
      exitOnCtrlC: false,
      patchConsole: false
    })
  }
  frames () {
    return this.stdout?.frames()
  }
  lastFrame () {
    return this.stdout.lastFrame()
  }
  press (data:string) {
    this.ttyIn.emit('keypress', data)
  }
  type (data:string) {
    for (const char of data) {
      // -- events aren't necessarily ordered.
      this.ttyIn.emit('keypress', char)
    }
  }
  rerender () {

  }
}
