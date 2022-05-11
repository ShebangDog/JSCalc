export const dropLeft = (list, count) => [...list].splice(count)

export const dropRight = (list, count) => {
    const dropped = [...list]

    dropped.length = dropped.length - count

    return dropped
}

export const dropWhile = (list, predicate) => list.reduce(([result, isContinue], element) => {
    const complexCondition = isContinue && predicate(element)
    const [_, ...tail] = result

    return [
        complexCondition ? tail : result,
        complexCondition
    ]
}, [list, true])[0]
