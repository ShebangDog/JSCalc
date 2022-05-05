export const takeWhile = (list, predicate) => list.reduce(([result, isContinue], element) => {
    const complexCondition = isContinue && predicate(element)

    return [
        complexCondition ? [...result, element] : result,
        complexCondition
    ]
}, [[], true])[0]
