# JSCalc

Sample code
```
left: 1 + 2 + 3 // 6
right: 10 - 1 + 3 // 12

multiLineExpr: 1 + 2 + 
    3 + 
    4

expr: 1 + 2 + 3
+ 4 //ただの式

result: left + right // => 18
```

Syntax
```ebnf
<program> ::= { <statement> }

<statement> ::= (<decl> | <expr>) { <NewLine> }

<decl> ::= <ident> ":" <expr>

<expr> ::= <fact> { ("+" | "-") [<NewLine>] <fact> }

<fact> ::= <ident> | <number> | "(" <expr> ")"

<ident> ::= [a-Z]

```
