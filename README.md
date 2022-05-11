# JSCalc

Sample code
```
left: 1 + 2 + 3 // 6
right: 10 - 1 + 3 // 12

result: left + right // => 18
```

Syntax
```ebnf
<program> ::= { <statement> }

<statement> ::= <decl> | <expr>

<decl> ::= <ident> ":" <expr>

<expr> ::= <fact> { ("+" | "-") <fact> }

<fact> ::= <ident> | <number> | "(" <expr> ")"

<ident> ::= [a-Z]

```
