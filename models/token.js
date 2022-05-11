class Token {
    constructor(value) {
        this.value = value
    }
}

export class Reserved extends Token {
    constructor(value) {
        super(value)
    }
    
    is(value) {
        return value === this.value
    }
}

export const Space = new class Space extends Reserved {
    constructor() {
        super(" ")
    }
}

export const NewLine = new class NewLine extends Reserved {
    constructor() {
        super("\n")
    }
}

export const Semicolon = new class Semicolon extends Reserved {
    constructor() {
        super(";")
    }
}

export const Colon = new class Colon extends Reserved {
    constructor() {
        super(":")
    }
}

export class ParenthesOpen extends Reserved {
    constructor() {
        super("(")
    }
}

export class ParenthesClose extends Reserved {
    constructor() {
        super(")")
    }
}


export const Parenthes = {
    Open: new ParenthesOpen(),
    Close: new ParenthesClose(),
}

export class NaturalNumber extends Token {
    static is = (string) => !Number.isNaN(Number.parseInt(string, 10))
    static of = (value) => new NaturalNumber(value)

    constructor(value) {
        super(value)
    }
}

export class Operator extends Token {
    static list = ["+", "-"]
    static is = (string) => this.list.includes(string)
    static of = (value) => new Operator(value)

    constructor(value) {
        super(value)
    }
}

export class Identity extends Token {
    static is = (string) => {
        const [head, ...tail] = string

        if (this.Head.isNot(head)) return false
        if (this.Tail.isNot(tail)) return false

        return true
    }
    
    static Head = ({
        isNot: (value) => [(char) => Colon.is(char), NaturalNumber.is].some(pred => pred(value))
    })
    
    static Tail = ({
        isNot: (value) => [(char) => Colon.is(char)].some(pred => pred(value))
    })
    
    static of = (identity) => new Identity(identity)

    constructor(identity) {
        super(identity)
    }
}
