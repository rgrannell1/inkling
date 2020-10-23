
import through from 'through'

export interface StubStdout extends through.ThroughStream {
	lastFrame? (): string | undefined
	_lastFrame?: string
	rows?: number
	columns?: number
}
