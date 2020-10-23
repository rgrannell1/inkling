
import { EventEmitter } from 'events'

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

export const stubStdout = (args:StdoutArgs) => {
	return emitStream(new Stdout(args))
}
export const stubStderr = () => {
	return emitStream(new Stderr())
}
export const stubStdin = () => {
	return emitStream(new Stdin())
}
