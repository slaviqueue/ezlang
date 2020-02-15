const { interpret } = require('./src/interpreter')
const { parser } = require('./src/parser')

const code = `
func fac (n) {
   if n == 1 then n else n * fac(n - 1)
}

fac(10)

func curriedSum (a) {
   func (b) {
      a + b
   }
}

val smallNumber = sin(30)
val seven = curriedSum(3)(4)

val id = func (a) { a }

val result = id(3)

log(result)
log(seven)
log(smallNumber)
`

function run (code) {
  return interpret(parser.parse(code))
}

run(code)
