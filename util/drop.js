export const dropLeft = (list, count) => [...list].splice(count)

export const dropRight = (list, count) => {
    const dropped = [...list]

    dropped.length = dropped.length - count

    return dropped
}

