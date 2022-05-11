class NodeClass {
    constructor(value, left, right) {
        this.value = value
        this.left = left
        this.right = right
    }
}

export const Declaration = class Declaration extends NodeClass {
    constructor(ident, value) {
        super(":", ident, value)
    }
}

export const concat = (value, left, right) => new NodeClass(value, left, right)

export const Node = {
    None: new NodeClass(),
    Leaf: (value) => new NodeClass(value),
}

