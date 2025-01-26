export const useNet = () => {
    class CalculatePosition {
        defaultTopic(index: number, quantity: number, mainX: number = 0, mainY: number = 0): {xposition: number, yposition: number} {
            const space = 500
            const startMaxElements = 5

            function levelCount(level: number) {
                if (index+1 - (startMaxElements+Math.floor(level/2))*(level+1) <= 0) {
                    return level
                } else {
                    return levelCount(level+1)
                }
            }

            const level = levelCount(0)
            const currentLineElement = (index+1+Math.floor(level/2))%(startMaxElements+Math.floor(level/2)) - 1
            const padding = (5+Math.floor(level/2)) * 75
            const x = currentLineElement * space - padding
            const y = (350 + (Math.floor(level/2))*350)*(-1)**level

            return {xposition: x , yposition: y}
        }
        
        defaultTask(index: number, quantity: number, xstart: number, ystart: number): { xposition: number, yposition: number } {
            const space = 70

            const part: Record<number, { x: number, y: number }> = {
                1: {
                    x: -1,
                    y: 1,
                },
                2: {
                    x: 1,
                    y: -1,
                },
                3: {
                    x: -1,
                    y: -1,
                },
                4: {
                    x: 1,
                    y: 1
                }
            } 

            const x = xstart + space*index*part[Math.floor(index/3) + 1].x + 160 
            const y = ystart - 70*index*part[Math.floor(index/3) + 1].y + 20

            return {xposition: x, yposition: y}
        }
    }

    const calculatePosition = new CalculatePosition

    return { calculatePosition }
}