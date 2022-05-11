import { tokenize } from "./front/tokenize.js"
import { parse } from "./front/parse.js"
import { run } from "./back/runner.js"

const main = () => {
    const input = `
    
    
    value: 1 + 2 + 3 + 4 + (5)
    value + 1
    left: value + 10

    left + value
    
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