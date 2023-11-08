export const hammingDistance = (num1: number, num2: number): number => {
    let xored = num1 ^ num2;
    let bits = 0
    while (xored) {
        bits += xored % 2;
        xored = Math.floor(xored / 2);
    }
    return bits;
}


export function calculateEuclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}