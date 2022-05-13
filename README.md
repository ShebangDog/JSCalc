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

出力する関数を用意しない代わりに最後の値を出力する

Syntax
```ebnf
<program> ::= { <statement> }

<statement> ::= (<decl> | <expr>) { <NewLine> }

<decl> ::= <ident> ":" <expr>

<expr> ::= <fact> { ("+" | "-") [<NewLine>] <fact> }

<fact> ::= <ident> | <signed> | "(" <expr> ")"

<signed> ::= [("+" | "-")]<number> | [("+" | "-")] "(" <expr> ")"

<ident> ::= [a-Z]

```
