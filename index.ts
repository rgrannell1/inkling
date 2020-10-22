
import type {ReactElement} from 'react'
import {render as inkRender} from 'ink'
import type {Instance as InkInstance} from 'ink'

import {
  Stdin,
  Stderr,
  Stdout
} from './fd.js'

class Inkling {
  instance:InkInstance
  constructor (tree:ReactElement) {
    const stdout = new Stdout()
    const stdin = new Stdin()
    const stderr = new Stderr()

    this.instance = inkRender(tree, {
      stdout: stdout as any,
      stdin: stdin as any,
      stderr: stderr as any,
      debug: true,
      exitOnCtrlC: true,
      patchConsole: false
    })
  }
}

