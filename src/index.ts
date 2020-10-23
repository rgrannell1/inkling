
import type {ReactElement} from 'react'
import {render as inkRender} from 'ink'
import type {Instance as InkInstance} from 'ink'

import {
  stubStdin,
  stubStderr,
  stubStdout
} from './fd.js'

interface GetComponentArgs {
  stdin: any,
  stderr: any,
  stdout: any
}

type GetComponent = (data:GetComponentArgs) => ReactElement

export default class Inkling {
  instance:InkInstance
  stdin:any
  stdout:any
  stderr:any
  constructor (getComponent:GetComponent) {
    this.stdout = stubStdout({
      rows: 25,
      columns: 100
    })
    this.stdin = stubStdin()
    this.stderr = stubStderr()

    const tree = getComponent({
      stdin: this.stdin,
      stdout: this.stdout,
      stderr: this.stderr
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
  content () {
    // -- not defined on event-emitter type, readd.
    return this.stdout.lastFrame()
  }
}
