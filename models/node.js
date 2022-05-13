import { NaturalNumber } from "./token.js"

class NodeClass {
    constructor(value, left, right) {
        this.value = value
        this.left = left
        this.right = right
    }
}

export class Declaration extends NodeClass {
    constructor(ident, value) {
        super(":", ident, value)
    }
}

export const concat = (value, left, right) => new NodeClass(value, left, right)

export const signedNumber = (operator, value) => {
    const zero = NaturalNumber.of("0")
    return concat(operator, Node.Leaf(zero), value)
}

export const Node = {
    None: new NodeClass(),
    Leaf: (value) => new NodeClass(value),
}

