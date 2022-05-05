import { NaturalNumber, Operator } from "./models/token.js"
import { None, concat, Leaf } from "./models/node.js"

export const parse = (tokenList, result = []) => {
    if (tokenList.length === 0) return result

    const [head] = tokenList

    if (head instanceof NaturalNumber) {
        const [expr, consumedTokenList] = expression(tokenList)

        return parse(consumedTokenList, [...result, expr])
    }

    throw Error(`expect NaturalNumber, but got ${head}`)
}

const expression = (tokenList, result = [None, tokenList]) => {
    if (tokenList.length === 0) return result
    const [resultNode, _] = result
    
    const [token, ...tail] = tokenList
    if (token instanceof NaturalNumber) {
        const [operator, right, ...rest] = tail
        if (!(operator instanceof Operator)) throw Error(`expect Operator, but got ${operator}`)
        if (!(right instanceof NaturalNumber)) throw Error(`expect NaturalNumber but got ${right}`)

        return expression(rest, [concat(operator, Leaf(token), Leaf(right)), rest])
    }

    if (token instanceof Operator) {
        const [right, ...rest] = tail
        if (right instanceof NaturalNumber) return expression(rest, [concat(token, resultNode, Leaf(right)), rest])

        throw Error(`expect NaturalNumber, but got ${right}`)
    }

    throw Error(`expect Operator, but got ${token}`)
}
