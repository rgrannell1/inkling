
import tap from 'tap'
import * as fd from '../src/fd.js'

const testStderr = () => {
  const stream = fd.stubStderr()
}

const testStdin = () => {
  const stream = fd.stubStdin()
}

const testStdout = async () => {
  const stream = fd.stubStdout({
    columns: 100,
    rows: 20
  })

  stream.write('test')

  const text = await new Promise(resolve => {
    stream.on('data', (data:string) => {
      resolve(data)
    })
  })

  tap.equal(text, 'test')
}

const testTtyIn = async () => {
  const stream = fd.stubTtyIn()
  stream.press('a')

  const char = await new Promise(resolve => {
    stream.on('keypress', (char:string) => {
      resolve(char)
    })
  })

  tap.equal(char, 'a')
}

testStderr()
testStdin()
testStdout()
testTtyIn()
