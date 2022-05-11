import { Reserved } from "../models/token.js"
import { Operator, Identity } from "../models/token.js"
import { NaturalNumber } from "../models/token.js"
import { takeWhile } from "../util/take.js"
import { dropLeft } from "../util/drop.js"

const { Space, NewLine, Colon, Parenthes } = Reserved

export const tokenize = (characterList, result = []) => {
    if (characterList.length === 0) return result

    const [head, ...tail] = characterList

    if (Space.is(head)) return tokenize(tail, result)
    if (Colon.is(head)) return tokenize(tail, [...result, Colon])
    if (NewLine.is(head)) return tokenize(tail, [...result, NewLine])

    if (Operator.is(head)) return tokenize(tail, [...result, Operator.of(head)])

    const keywords = [Parenthes.Open, Parenthes.Close]
    for (const keyword of keywords) {
        if (keyword.is(head)) return tokenize(tail, [...result, keyword])   
    }

    if (NaturalNumber.is(head)) {
        const naturalNumber = takeWhile(characterList, NaturalNumber.is).join("")

        const token = NaturalNumber.of(naturalNumber)
        const consumedCharacterList = dropLeft(characterList, token.value.length)

        return tokenize(consumedCharacterList, [...result, token])
    }

    if (Identity.is(head)) {
        const identity = takeWhile(characterList, Identity.is).join("")

        const token = Identity.of(identity)
        const consumedCharacterList = dropLeft(characterList, token.value.length)

        return tokenize(consumedCharacterList, [...result, token])
    }

    throw Error(`some token expected, but got ${JSON.stringify(head)}`)
}
