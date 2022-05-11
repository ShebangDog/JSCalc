class Node {
    constructor(value, left, right) {
        this.value = value
        this.left = left
        this.right = right
    }
}

export const Declaration = class Declaration extends Node {
    constructor(ident, value) {
        super(":", ident, value)
    }
}

export class EndOfFile extends Node {
}

export const concat = (value, left, right) => new Node(value, left, right)

export const None = new Node()
export const Leaf = (value) => new Node(value)

