





export function integerToBinary(number:number) {
    return number.toString(2);
}

export function integerToBinaryArray(number:number) {
    console.log(`integerToBinaryArrayBefore:${number}`)
    console.log(`integerToBinaryArrayAfter:${integerToBinary(number).split('').map(Number)}`)
    return integerToBinary(number).split('').map(Number);
}

export function binaryArrayToNumber(binaryArray: number[]): number {
    const binaryString = binaryArray.join('');
    const decimalNumber = parseInt(binaryString, 2);

    return decimalNumber;
}
