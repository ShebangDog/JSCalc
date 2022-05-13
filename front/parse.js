import { concat, Declaration, Node, signedNumber } from "../models/node.js"
import { Identity, NaturalNumber, ParenthesOpen, ParenthesClose, Operator, NewLine, Colon } from "../models/token.js"
import { dropWhile } from "../util/drop.js"

export const parse = (tokenList) => {
    const remain = dropWhile(tokenList, token => token instanceof NewLine)

    return program(remain)
}

const program = (tokenList, result = []) => {
    if (tokenList.length === 0) return result

    const [node, consumed] = statement(tokenList)
    const remain = dropWhile(consumed, elem => elem instanceof NewLine)

    return program(remain, [...result, node])
}

const statement = (tokenList) => {
    const [head, maybeColon] = tokenList

    if (head instanceof Identity && maybeColon instanceof Colon) return declaration(tokenList)
    if (head instanceof NaturalNumber || head instanceof ParenthesOpen || head instanceof Identity || head instanceof Operator) return expression(tokenList)

    throw new Error("error")
}

const declaration = (tokenList) => {
    const [identity, colon, ...tail] = tokenList

    if (!identity instanceof Identity) throw new Error(`expect Identity, but got ${identity}`)
    if (!colon instanceof Colon) throw new Error(`expect ${JSON.stringify(Colon)}, but got ${JSON.stringify(colon)}`)

    const [value, remain] = expression(tail)

    return [new Declaration(identity, value), remain]
}

const expression = (tokenList) => {
    const recurse = (tokenList, result) => {
        const [head, ...tail] = tokenList

        if (tokenList.length === 0 || head instanceof NewLine) return result
        
        const [node, _] = result
        
        if (head instanceof Operator) {
            const [next, ...newLineConsumed] = tail
            const remain = next instanceof NewLine 
                ? newLineConsumed
                : tail

            const [right, consumed] = primary(remain)

            return recurse(consumed, [concat(head, node, right), consumed])
        }

        if (head instanceof ParenthesClose) return result

        throw new Error(`expect Operator or Parenthes, but got ${JSON.stringify(head)}`)
    }

    const [token] = tokenList

    if (token instanceof NaturalNumber || token instanceof ParenthesOpen || token instanceof Identity) {
        const [node, consumed] = primary(tokenList)
        return recurse(consumed, [node, consumed])
    }

    if (token instanceof Operator) {
        const [_, ...tail] = tokenList
        const [node, consumed] = expression(tail)
        
        return [signedNumber(token, node), consumed]
    }

    throw new Error(`expect NaturalNumber, but got ${JSON.stringify(token)}`)
}

const primary = (tokenList, result = [Node.None, tokenList]) => {
    const [token, ...tail] = tokenList

    if (token instanceof NaturalNumber || token instanceof Identity) return [Node.Leaf(token), tail]

    if (token instanceof ParenthesOpen) {
        const [node, [close, ...consumed]] = expression(tail, [result[0], tail])
        if (!close instanceof ParenthesClose) throw new Error(`expect ${Parenthes.Close.value}, but got ${close}`)

        return [node, consumed]
    }

    throw new Error(`expect NaturalNumber or Operator, but got ${token}`)
}
