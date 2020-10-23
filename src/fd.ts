
import {
	StubStdout
} from './types'

import events from 'events'
import through from 'through'

interface StdoutArgs {
	rows: number
	columns: number
}

export const stubStdout = (args:StdoutArgs) => {
	const ref:StubStdout = through(function write (data:string) {
		this.queue(data)
		ref._lastFrame = data
	})

	return Object.assign(ref, {
		get columns () {
			return args.columns
		},
		get rows () {
			return args.rows
		},
		lastFrame () {
			return ref._lastFrame
		}
	})
}

export class TTYIn extends events.EventEmitter {
	isTTY = true
	press (data: string) {
		this.emit('keypress', data)
	}
	setEncoding() { }
	setRawMode() { }
	resume() { }
	pause() { }
}

export const stubStderr = () => {
	return through()
}

export const stubStdin = () => {
	return through()
}

export const stubTtyIn = () => {
	return new TTYIn()
}
