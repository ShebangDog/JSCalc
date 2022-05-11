import { tokenize } from "./front/tokenize.js"
import { parse } from "./front/parse.js"
import { run } from "./runner.js"

const main = () => {
    const input = `
    value: (1 + 2) + 3 + 123`

    const tokenList = tokenize(input.split(""))
    console.log(tokenList)

    const code = parse(tokenList)
    const result = run(code)

    const paperList = [
        ...tokenList,
        result
    ]

    paperList.forEach(paper => console.log(paper))
}

main()
