import { Space } from "./models/token.js"
import { Operator } from "./models/token.js"
import { NaturalNumber } from "./models/token.js"
import { takeWhile } from "./util/take.js"
import { dropLeft } from "./util/drop.js"

export const tokenize = (characterList, result = []) => {
    if (characterList.length === 0) return result

    const [head, ...tail] = characterList

    if (Space.is(head)) return tokenize(tail, result)
    if (Operator.is(head)) return tokenize(tail, [...result, Operator.of(head)])

    if (NaturalNumber.is(head)) {
        const naturalNumber = takeWhile(characterList, NaturalNumber.is).join("")

        const token = NaturalNumber.of(naturalNumber)
        const consumedCharacterList = dropLeft(characterList, token.value.length)

        return tokenize(consumedCharacterList, [...result, token])
    }

    throw Error(`some token expected, but got ${head}`)
}
