import { NaturalNumber, Operator } from "./models/token.js"
import { EmptyStack } from "./stack.js"

const stack = (rpnExpr) => rpnExpr.reduce(([numberStack, operatorStack], elem) => {
    if (elem instanceof NaturalNumber) return [numberStack.push(elem.value - 0), operatorStack]
    if (elem instanceof Operator) return [numberStack, operatorStack.push(elem.value)]
        
    throw new Error("error")
}, [EmptyStack, EmptyStack])

const operatorMap = {
    "+": (left, right) => left + right,
    "-": (left, right) => left - right,
}

const myEval = (numberStack, operatorStack) => {
    if (operatorStack.size === 0) {
        if (numberStack.size < 1) throw new Error("expected Stack top, but got undefined")
        if (numberStack.size > 1) throw new Error("error")

        return numberStack.top
    }

    const operator = operatorStack.top
    const poppedOpStack = operatorStack.pop()

    const [right, left] = [numberStack.top, numberStack.pop().top]
    const poppedNumStack = numberStack.pop().pop()

    const pushedNumStack = poppedNumStack.push(operatorMap[operator](left, right))

    return myEval(
        pushedNumStack,
        poppedOpStack,
    )
}

export const evaluate = (rpnExpr) => {
    const [numberStack, operatorStack] = stack(rpnExpr)

    return myEval(numberStack, operatorStack)
}
