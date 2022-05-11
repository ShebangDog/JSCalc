import { tokenize } from "./front/tokenize.js"
import { parse } from "./front/parse.js"
import { run } from "./back/runner.js"

const main = () => {
    const input = `
    
    
    value: 1 + 2 + 3 + 123 + (3)
    value + 1
    `

    const tokenList = tokenize(input.split(""))
    const code = parse(tokenList)
    const result = run(code)

    const paperList = [
        result
    ]

    paperList.forEach(paper => console.log(paper))
}

main()