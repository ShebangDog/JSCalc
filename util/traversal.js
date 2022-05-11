const inOrderTraversal = (node, transform, result = []) => {
    if (node === undefined) return result

    const left = inOrderTraversal(node.left, transform, result)
    const right = inOrderTraversal(node.right, transform, [...left, transform(node.value)])

    return right
}

const preOrderTraversal = (node, transform, result = []) => {
    if (node === undefined) return result

    const left = preOrderTraversal(node.left, transform, [...result, transform(node.value)])
    const right = preOrderTraversal(node.right, transform, left)

    return right
}

const postOrderTraversal = (node, transform, result = []) => {
    if (node === undefined) return result

    const left = postOrderTraversal(node.left, transform, result)
    const right = postOrderTraversal(node.right, transform, left)

    return [...right, transform(node.value)]
}

export const traversal = (kind) => (node, transform, result = []) => {
    const mapper = {
        [InOrder]: inOrderTraversal,
        [PreOrder]: preOrderTraversal,
        [PostOrder]: postOrderTraversal,
    }

    return mapper[kind](node, transform, result)
}

export const PostOrder = "PostOrder"
export const InOrder = "InOrder"
export const PreOrder = "PreOrder"
