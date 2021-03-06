
# inkling

![CI](https://github.com/rgrannell1/inkling/workflows/CI/badge.svg)

Inkling is a puppeteer-style testing library based on [ink-testing-library](https://github.com/vadimdemedes/ink-testing-library). It differs in providing
convenience wrappers for sending interactive inputs.

```tsx
$app = new Inkling(({stdin}) => {
  return <App stdin={stdin}>
})

$app.stdin.write('line0')
$app.stdin.write('line1')

$app.type('hello, this is input text')

const content = $app.lastFrame()

$app.close()
```

### Stability Index

> 1, Experimental - This project might die, it's undertested and underdocumented, and redesigns and breaking changes are likely

### Files

```
.github/workflows
  main.yaml                    defines the CI workflow for testing this repo
  dist                         compiled code, so people don't need to manually compile to test
  src/
```

### License

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
