const halfPrecisionBytesLength = 2; // 16 bits
const singlePrecisionBytesLength = 4; // 32 bits
const doublePrecisionBytesLength = 8; // 64 bits
const bitsInByte = 8;

/**
 * Converts the float number into its IEEE 754 binary representation.
 * @see: https://en.wikipedia.org/wiki/IEEE_754
 *
 * @param {number} floatNumber - float number in decimal format.
 * @param {number} byteLength - number of bytes to use to store the float number.
 * @return {string} - binary string representation of the float number.
 */

export function decreaseToSmallestDecimal(numb:number) {
    if (numb === 0) {
        return 1;
    }

    let smallestDecimal = 1;

    let decimalPlaces = (Math.abs(numb).toString().split('.')[1] || '').length;

    while (decimalPlaces > 0) {
        numb *= 10;
        smallestDecimal *= 10;
        decimalPlaces--;
    }

    return 1 / (smallestDecimal * 10);
}


export function getSmallestDecimal(num:number) {
    // Преобразовываем число в строку
    const numberStr = num.toString();

    // Ищем индекс десятичной точки
    const decimalPointIndex = numberStr.indexOf('.');

    if (decimalPointIndex !== -1) {
        // Если десятичная точка найдена, вычисляем количество нулей после точки
        const zerosAfterDecimal = numberStr.length - decimalPointIndex - 1;
        return Math.pow(0.1, zerosAfterDecimal);
    } else {
        // Если нет десятичной точки, разряд равен 1
        return 1;
    }
}

function floatAsBinaryString(floatNumber: number, byteLength: number): string {
    let numberAsBinaryString = '';

    const arrayBuffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(arrayBuffer);

    const byteOffset = 0;
    const littleEndian = false;

    if (byteLength === singlePrecisionBytesLength) {
        dataView.setFloat32(byteOffset, floatNumber, littleEndian);
    } else {
        dataView.setFloat64(byteOffset, floatNumber, littleEndian);
    }

    for (let byteIndex = 0; byteIndex < byteLength; byteIndex += 1) {
        let bits = dataView.getUint8(byteIndex).toString(2);
        if (bits.length < bitsInByte) {
            bits = new Array(bitsInByte - bits.length).fill('0').join('') + bits;
        }
        numberAsBinaryString += bits;
    }

    return numberAsBinaryString;
}

/**
 * Converts the float number into its IEEE 754 64-bits binary representation.
 *
 * @param {number} floatNumber - float number in decimal format.
 * @return {string} - 64 bits binary string representation of the float number.
 */
export function floatAs64BinaryString(floatNumber: number) {
    return floatAsBinaryString(floatNumber, doublePrecisionBytesLength);
}

/**
 * Converts the float number into its IEEE 754 32-bits binary representation.
 *
 * @param {number} floatNumber - float number in decimal format.
 * @return {string} - 32 bits binary string representation of the float number.
 */
export function floatAs32BinaryString(floatNumber: number) {
    return floatAsBinaryString(floatNumber, singlePrecisionBytesLength);
}

export function floatAs16BinaryString(floatNumber: number) {
    return floatAsBinaryString(floatNumber, halfPrecisionBytesLength);
}