import { dropRight } from "./util/drop.js"

export const Stack = (downTopList = []) => ({
    top: downTopList[downTopList.length - 1],
    push: (value) => Stack([...downTopList, value]),
    pop: () => Stack(dropRight(downTopList, 1)),
    size: downTopList.length,
})

export const EmptyStack = Stack()
