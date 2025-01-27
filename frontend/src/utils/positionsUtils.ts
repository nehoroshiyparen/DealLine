export type Position = { x: number, y: number }

export const isCollision = (
    newX: number,
    newY: number,
    size: number,
    nodePositions: { [key: string]: Position }
): boolean => {
    for (const key in nodePositions) {
        const { x, y } = nodePositions[key]
        const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
        if (distance < size ) {
            return true
        }
    }
    return false
}

export const getUniquePosition = (
    x: number,
    y: number,
    size: number,
    nodePositions: { [key: string]: Position },
    quantity: number,
    maxIterations: number = 100
):Position => {
    let newX = x
    let newY = y
    let iterations = 0

    while (isCollision(newX, newY, size, nodePositions) || iterations > maxIterations) {
        newX = x + Math.random() * quantity * 200 + 50
        newY = y + Math.random() * quantity * 200 + 50
    }

    nodePositions[`x${newX}_y${newY}`] = { x: newX, y: newY }
    return { x: newX, y: newY }
}