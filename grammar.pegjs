Program
 = ws body:(res:(Statement / Expression / PrimaryExpression) ws { return res })*
 { return { type: 'PROGRAM', body } }

Statement
 = VariableDeclaration
 / Assigment
 / Expression
 / Return

Expression
 = Addition

PrimaryExpression
 = FunctionDeclaration
 / CurriedFunctionCall
 / FunctionCall
 / Identifier
 / Number
 / Condition

FunctionDeclaration
 = 'func' strict_ws id:Identifier ws '(' ws args:ArgumentsList? ')' ws '{' ws body:(body:Program ws { return body }) '}'
 { return { type: 'FUNCTION_DECLARATION', args, id, body } }

VariableDeclaration
 = 'val' strict_ws id:Identifier ws '=' ws value:(Expression / PrimaryExpression)
 { return { type: 'VARIABLE_DECLARATION', id, value } }

Assigment
 = 'set!' ws id:Identifier ws '=' ws (Expression / PrimaryExpression)
 { return { type: 'ASSIGMENT', id, value } }

Addition
 = left:PrimaryExpression ws '+' ws right:Addition
 { return { type: 'PLUS', left, right } }
 / PrimaryExpression

Condition
  = "if" strict_ws cond:Expression strict_ws "then" strict_ws ifTrue:Expression strict_ws "else" strict_ws ifFalse:Expression
  { type: 'CONDITION', ifTrue, ifFalse }

FunctionCall "function call"
  = callee:(Identifier) ws "(" ws args:ArgumentsList? ws ")"
   { return { type: 'FUNCTION_CALL', callee, args: args || [] } }

CurriedFunctionCall "function call"
  = callee:FunctionCall
     calls:(ws "(" ws args:ArgumentsList? ws ")"
         { return { type: 'FUNCTION_CALL', callee, args: args || []  } })+
  { return calls.reduceRight((callee, call) => ({ ...call, callee })) }

ArgumentsList
  = args:(first:Expression rest:(ws ',' ws id:Expression { return id })* { return [first, ...rest] })?
 { return args || [] }

ParametersList
  = args:(first:Expression rest:(ws ',' ws id:Expression { return id })* { return [first, ...rest] })?
 { return args || [] }

Identifier
  = id:[a-zA-Z]+
 { return { type: 'IDENTIFIER', value: id.join('') } }
 
Number
  = value:[0-9]+
 { return { type: 'NUMBER', value: Number(value.join('')) } }

Return
  = 'return' strict_ws what:(Expression / PrimaryExpression)
 { return { type: 'RETURN', what } }

ws = strict_ws*

strict_ws
  = ("\t"
  / "\n"
  / "\f"
  / " "
  / "\u00A0"
  / "\uFEFF")