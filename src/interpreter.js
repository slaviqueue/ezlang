function stack (...elements) {
  return elements
}

function push (stack, element) {
  return [element, ...stack]
}

function head (stack) {
  return stack[0]
}

function pop ([head, ...stack]) {
  return stack
}

function empty (stack) {
  return !stack.length
}

function copy (copiable) {
  return stack(...copiable)
}

function last (arr) {
  return arr[arr.length - 1]
}

function frame (scope) {
  return { scope }
}

function scope ({ parent, env }) {
  return { parent, env }
}

let callstack = stack(frame(scope({ parent: null, env: {} })))

function invokeFunction (fn, args) {
  const interpretedArgs = fn.args.map((arg, i) => [arg.value, interpret(args[i])])

  callstack = push(callstack, frame(scope(fn.scope)))
  interpretedArgs.forEach(([id, value]) => declareVariable(id, value))
}

function declareVariable (id, value) {
  head(callstack).scope.env[id] = value
}

function declareFunction (id, fn) {
  const fnWithScope = { ...fn, scope: scope({ env: {}, parent: head(callstack).scope }) }
  declareVariable(id, fnWithScope)
  return fnWithScope
}

function lookup (scope, id) {
  if (scope.env[id]) {
    return scope.env[id]
  }

  if (!scope.parent) {
    return null
  }

  return lookup(scope.parent, id)
}

function interpret (node) {
  switch (node.type) {
    case 'PROGRAM':
      return node.body.map(interpret)

    case 'VARIABLE_DECLARATION': {
      const value = interpret(node.value)
      declareVariable(node.id.value, value)
      return value
    }

    case 'IDENTIFIER':
      return lookup(head(callstack).scope, node.value)

    case 'NUMBER':
      return Number(node.value)

    case 'FUNCTION_DECLARATION': {
      return declareFunction(node.id.value, node)
    }

    case 'CONDITION':
      return interpret(node.cond) ? interpret(node.ifTrue) : interpret(node.ifFalse)

    case 'FUNCTION_CALL': {
      const fn = interpret(node.callee)

      invokeFunction(fn, node.args)

      const result = last(fn.body.body.map(interpret))
      callstack = pop(callstack)

      return result
    }

    case '+':
      return interpret(node.left) + interpret(node.right)

    case '-':
      return interpret(node.left) - interpret(node.right)

    case '*':
      return interpret(node.left) * interpret(node.right)

    case '/':
      return interpret(node.left) / interpret(node.right)

    case 'EQUALITY':
      return interpret(node.left) === interpret(node.right)
  }
}

module.exports = { interpret }
