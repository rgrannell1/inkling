
import tap from 'tap'
import * as fd from '../src/fd.js'

const testStderr = () => {
  const stream = fd.stubStderr()
}

const testStdin = () => {
  const stream = fd.stubStdin()
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
testTtyIn()
