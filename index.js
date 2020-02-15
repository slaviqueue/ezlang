const { interpret } = require('./src/interpreter')
const { parser } = require('./src/parser')

const code = `
func fac (n) {
   if n == 1 then n else n * fac(n - 1)
}

fac(10)

func curriedSum (a) {
   func sum (b) {
      a + b
   }
}

curriedSum(3)(4)
`

function run (code) {
   return interpret(parser.parse(code))
}

console.log(run(code))
