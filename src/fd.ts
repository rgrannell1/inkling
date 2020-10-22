
import {EventEmitter} from 'events'

export class Stdout extends EventEmitter {
	get rows() {
		return 25
  }
  get columns() {
		return 50
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

export class Stdin extends EventEmitter {
  isTTY = true
  write (data:string) {
    this.emit('data', data)
  }
  setEncoding () { }
  setRawMode () { }
  result () { }
  pause () { }
}

export class Stderr extends EventEmitter {
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
