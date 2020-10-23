
import through from 'through'

interface StdoutArgs {
	rows: number
	columns: number
}

interface StubStdout extends through.ThroughStream {
	lastFrame? (): string | undefined
	_lastFrame?: string
	rows?: number
	columns?: number
}

export const stubStdout = (args:StdoutArgs) => {
	const ref:StubStdout = through(function write (data:string) {
		this.queue(data)
		ref._lastFrame = data
	})
	ref.lastFrame = () => ref._lastFrame
	ref.columns = args.columns
	ref.rows = args.rows

	return ref
}
export const stubStderr = () => {
	return through()
}
export const stubStdin = () => {
	return through()
}
