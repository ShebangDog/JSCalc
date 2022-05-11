import { Colon, Identity, NaturalNumber, NewLine, Operator, Parenthes, ParenthesClose, ParenthesOpen } from "../models/token.js"
import { None, concat, Leaf, Declaration, EndOfFile } from "../models/node.js"

export const parse = (tokenList) => program(tokenList)

const program = (tokenList, result = []) => {
    if (tokenList.length === 0) return [...result, new EndOfFile()]

    const [node, consumed] = statement(tokenList)

    return program(consumed, [...result, node])
}

const statement = (tokenList) => {
    const [newLine, ...remain] = tokenList
    const [head, eof, ...res] = remain

    if (newLine !== NewLine) throw new Error(`expect ${NewLine}, but got ${newLine}`)

    if (head instanceof Identity) {
        return decralation(tokenList)
    }

    if (head instanceof NaturalNumber || head instanceof ParenthesOpen) {
        console.log(remain)
        return expression(remain)
    }

    throw new Error("error")
}

const decralation = (tokenList) => {
    const [newLine, identity, colon, ...tail] = tokenList

    if (newLine !== NewLine) throw new Error(`expect NewLine, but got ${JSON.stringify(newLine)}`)

    if (!identity instanceof Identity) throw new Error(`expect Identity, but got ${identity}`)
    if (colon !== Colon) throw new Error(`expect ${JSON.stringify(Colon)}, but got ${JSON.stringify(colon)}`)

    const [value, remain] = expression(tail)

    return [new Declaration(identity, value), remain]
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

        throw new Error(`expect Operator or Parenthes, but got ${JSON.stringify(head)}`)
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
