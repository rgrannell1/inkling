
import React from 'react'
import type {ReactElement} from 'react'
import {render as inkRender} from 'ink'
import type {Instance as InkInstance} from 'ink'

import {
  stubStdin,
  stubStderr,
  stubStdout,
  stubTtyIn
} from './fd.js'
import { time } from 'console'

interface GetComponentArgs {
  stdin: any,
  stderr: any,
  stdout: any,
  ttyIn: any
}

type GetComponent = (data:GetComponentArgs) => ReactElement

export class Inkling {
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
  wait (timeout:number) {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }
  waitUntil (pred:(val:string) => Boolean, timeout:number = 10_000) {
    return new Promise(async (resolve, reject) => {
      const start = Date.now()

      while (true) {
        let isMatch = pred(this.lastFrame())
        if (isMatch) {
          return resolve()
        } else {
          // -- throw an error if too long has passed
          let elapsed = Date.now() - start
          if (elapsed > timeout) {
            reject(`${elapsed} elapsed`)
          }

          // -- not great, but it will work for polling.
          await new Promise(resolve => setTimeout(resolve, 250))
        }
      }
    })
  }
  press (data:KeyPress) {
    this.ttyIn.emit('keypress', data.sequence, data)
  }
  close () {
    this.instance.unmount()
    this.instance.cleanup()

    this.stdout.emit('end')
    this.stdin.emit('end')
    this.stderr.emit('end')
    this.ttyIn.emit('end')
  }
}

export class KeyPress {
  name?: string
  sequence?: string
  meta?: boolean
  ctrl?: boolean
  shift?: boolean
  constructor (name:string) {
    this.name = name
    this.sequence = name
    this.meta = false
    this.ctrl = false
    this.shift = false
  }
  static ESCAPE = new KeyPress('escape')
}
