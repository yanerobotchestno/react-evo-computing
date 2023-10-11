





export function integerToBinary(number:number) {
    return number.toString(2);
}

export function integerToBinaryArray(number:number) {
    return integerToBinary(number).split('').map(Number);
}