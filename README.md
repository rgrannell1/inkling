
# inkling

![CI](https://github.com/rgrannell1/inkling/workflows/CI/badge.svg)

Inkjs testing library.

```tsx
$app = new Inkling(({stdin}) => {
  return <App stdin={stdin}>
})

$app.stdin.write('line0')
$app.stdin.write('line1')

const content = $app.lastFrame()
```
