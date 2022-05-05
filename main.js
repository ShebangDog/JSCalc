import { tokenize } from "./tokenize.js"
import { parse } from "./parse.js"
import { PostOrder, traversal } from "./traversal.js"

const main = () => {
    const input = "1 + 2 + 3"

    const tokenList = tokenize(input.split(""))
    const code = parse(tokenList)

    code
      .map(elem => traversal(PostOrder)(elem, elem => elem))
      .forEach(elem => console.log(elem))
}

main()
