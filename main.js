import { tokenize } from "./tokenize.js"
import { parse } from "./parse.js"
import { PostOrder, traversal } from "./traversal.js"
import { evaluate } from "./eval.js"

const main = () => {
    const input = "(1 + 2) - 3"

    const tokenList = tokenize(input.split(""))

    const code = parse(tokenList)

    // const result = code.map(elem => traversal(PostOrder)(elem, e => e))

    const result = traversal(PostOrder)(code, elem => elem)

    const paperList = [
        tokenList,
        ...result,
        evaluate(result)
    ]

    paperList.forEach(paper => console.log(paper))
}

main()
