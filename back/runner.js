import { Declaration } from "../models/node.js"
import { EmptyStore } from "../util/store.js"
import { evaluate } from "./eval.js"

export const run = (code, store = EmptyStore, result = 0) => {
    const [stmt, ...remain] = code

    if (code.length === 0) return result
    
    const [appliedList, newStore] = (() => {
        if (stmt instanceof Declaration) {
            const { left: ident, right: expr } = stmt
            const value = evaluate(expr, store)
            const setted =  store.set(ident.value, value)

            return [
                value,
                setted,
            ]
        }

        return [
            evaluate(stmt, store),
            store,
        ]
    })()

    return run(remain, newStore, appliedList)
}
