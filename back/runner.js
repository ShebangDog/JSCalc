import { Declaration } from "../models/node.js"
import { PostOrder, traversal } from "../util/traversal.js"
import { evaluate } from "./eval.js"

export const run = (code, result = [0]) => {
    const [statement, ...remain] = code

    if (code.length === 0) return result[result.length - 1]

    return run(remain, statement instanceof Declaration 
        ? [...result, evaluate(traversal(PostOrder)(statement.right, elem => elem))]
        : result
    )
}
