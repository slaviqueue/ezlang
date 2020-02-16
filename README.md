# ezlang :ok_hand:

Simple language developed to practice implementing lexical scopes.

## What we have here?

### Higher order functions

```
val id = func (a) {
  a
}
```
Result of a function is the last expression inside it's body.

### Condition expressions

```
func am_i_happy(my_age) {
  if my_age == 13 then 1 else 0
}
```

## Roadmap:

### Namespaces

```
use http

func get_user (id) {
  get ("/users/" ++ id)
}
```

```
use qualified http

http::get ("/users/" ++ id)
```

### Pure/impure function modifiers

```
pure func add_one (n) {
  n + 1
}

impure func get_users (id) {
  http::get ("/users/" ++ id)
}
```

```
pure func really_impure_stuff () {
  http::get("/some/resource")
}

; Throws error at compile time ;
```

### Oneliners

```
func fib (n1, n2) -> if n <= 1 then n else fib (n - 1) + fib (n - 2) 
```

### Pattern matching

```
multi func
  interpret ({ type = "NUMBER", value }) -> to_number (value)
  interpret ({ type = "STRING", value }) -> to_string (value)
```
