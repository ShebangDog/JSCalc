import { tokenize } from "./front/tokenize.js"
import { parse } from "./front/parse.js"
import { run } from "./back/runner.js"

export const interpret = (source) => {
    const tokenList = tokenize(source.split(""))
    const code = parse(tokenList)
    const result = run(code)

    return result
}
