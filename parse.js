import { NaturalNumber, Operator, Parenthes, ParenthesClose, ParenthesOpen } from "./models/token.js"
import { None, concat, Leaf } from "./models/node.js"

export const parse = (tokenList) => {
    const [head] = tokenList

    if (head instanceof NaturalNumber || head instanceof ParenthesOpen) {
        const [expr, _] = expression(tokenList)
        return expr

    }

    throw Error(`expect NaturalNumber, but got ${head}`)
}

const expression = (tokenList) => {
    const recurse = (tokenList, result) => {
        if (tokenList.length === 0) return result
        
        const [head, ...tail] = tokenList
        const [node, _] = result
        
        if (head instanceof Operator) {
            const [right, consumed] = primary(tail)

            return recurse(consumed, [concat(head, node, right), consumed])
        }

        if (head instanceof ParenthesClose) return result

        throw new Error(`expect Operator or Parenthes, but got ${head}`)
    }

    const [head] = tokenList

    if (head instanceof NaturalNumber || head instanceof ParenthesOpen) {
        const [node, consumed] = primary(tokenList)
        return recurse(consumed, [node, consumed])
    }


    throw new Error(`expect NaturalNumber, but got ${token}`)
}

const primary = (tokenList, result = [None, tokenList]) => {
    const [token, ...tail] = tokenList

    if (token instanceof NaturalNumber) return [Leaf(token), tail]

    if (token instanceof ParenthesOpen) {
        const [node, [close, ...consumed]] = expression(tail, [result[0], tail])
        if (!close instanceof ParenthesClose) throw new Error(`expect ${Parenthes.Close.value}, but got ${close}`)

        return [node, consumed]
    }

    throw new Error(`expect NaturalNumber or Operator, but got ${token}`)
}
