class Token {
    constructor(value) {
        this.value = value
    }
}

class ReservedClass extends Token {
    constructor(value) {
        super(value)
    }
    
    is = (value) => {
        return value === this.value
    }
}

export class Space extends ReservedClass {
    constructor() {
        super(" ")
    }
}

export class NewLine extends ReservedClass {
    constructor() {
        super("\n")
    }
}

export class Semicolon extends ReservedClass {
    constructor() {
        super(";")
    }
}

export class Colon extends ReservedClass {
    constructor() {
        super(":")
    }
}

export class ParenthesOpen extends ReservedClass {
    constructor() {
        super("(")
    }
}

export class ParenthesClose extends ReservedClass {
    constructor() {
        super(")")
    }
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

export const Reserved = {
    Space: new Space(),
    NewLine: new NewLine(),
    Semicolon: new Semicolon(),
    Colon: new Colon(),
    Parenthes: {
        Open: new ParenthesOpen(),
        Close: new ParenthesClose(),
    },
}

const isList = Object.values(Reserved).map(obj => (obj?.Open?.is ?? obj?.Close?.is) ?? obj.is)

export class Identity extends Token {
    static is = (string) => {
        const [head, ...tail] = string

        if (this.Head.isNot(head)) return false
        if (this.Tail.isNot(tail)) return false

        return true
    }
    
    static Head = ({
        isNot: (value) => {
            const badHeadPattern = [
                ...isList,
                NaturalNumber.is
            ]
            
            return badHeadPattern.some(pred => pred(value))
        }
    })
    
    static Tail = ({
        isNot: (value) => [...isList].some(pred => pred(value))
    })
    
    static of = (identity) => new Identity(identity)

    constructor(identity) {
        super(identity)
    }
}
