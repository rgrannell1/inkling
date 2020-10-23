
import { EventEmitter } from 'events'
import through from 'through'

const emitStream = (emitter:EventEmitter) => {
	return emitter
}

interface StdoutArgs {
	rows: number
	columns: number
}

class Stdout extends EventEmitter {
	rows:number
	columns:number
	constructor (args:any) {
		super(args)
		this.rows = args.rows
		this.columns = args.columns
	}

	readonly frames: string[] = []
	private _lastFrame?: string

	write = (frame: string) => {
		this.frames.push(frame)
		this._lastFrame = frame
	}

	lastFrame = () => {
		return this._lastFrame
	}
}

class Stdin extends EventEmitter {
  isTTY = true
  write (data:string) {
    this.emit('data', data)
  }
  setEncoding () { }
  setRawMode () { }
  result () { }
	pause () { }
	pipe (stream:any) {

	}
}

class Stderr extends EventEmitter {
	readonly frames: string[] = []
	private _lastFrame?: string

	write = (frame: string) => {
		this.frames.push(frame)
		this._lastFrame = frame
	}

	lastFrame = () => {
		return this._lastFrame
	}
}

interface StubStdout extends through.ThroughStream {
	lastFrame? (): string | undefined
	_lastFrame?: string
}

export const stubStdout = (args:StdoutArgs) => {
	const ref:StubStdout = through(function write (data:string) {
		this.queue(data)
		ref._lastFrame = data
	})
	ref.lastFrame = () => ref._lastFrame

	return ref
}
export const stubStderr = () => {
	return through()
}
export const stubStdin = () => {
	return through()
}
