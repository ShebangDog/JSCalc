import { Identity, NaturalNumber, Operator } from "../models/token.js"
import { EmptyStack } from "../util/stack.js"
import { traversal, PostOrder } from "../util/traversal.js"

const operatorMap = {
    "+": (left, right) => left + right,
    "-": (left, right) => left - right,
}

const toRpn = (tree, store) => traversal(PostOrder)(tree, elem => 
    elem instanceof Identity ? NaturalNumber.of(store.get(elem.value).toString()) : elem
)

export const evaluate = (tree, store) => {
    const rpn = toRpn(tree, store)

    return rpn.reduce((numberStack, elem) => {
        if (elem instanceof NaturalNumber) return numberStack.push(elem.value - 0)
        if (elem instanceof Operator) {
            const operator = elem.value
            const [right, left] = [numberStack.top, numberStack.pop().top]
            const resultNumStack = numberStack.pop().pop()

            return resultNumStack.push(operatorMap[operator](left, right))
        }

        throw new Error("error on evaluate")
    }, EmptyStack).top
}
