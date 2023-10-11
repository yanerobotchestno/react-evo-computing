function countDecimalPlaces(number: number): number {
    const decimalPart = (number.toString().split('.')[1] || '').length;
    return decimalPart;
}

export function getInterval(minimum: number, maximum: number, precision: number) {
    const length = Math.abs(minimum + maximum);
    const count = (length / precision) + 1;

    const interval: number[] = [];
    //High risk to lose precision
    for (let i = minimum; i <= maximum; i = parseFloat((i + precision).toFixed(countDecimalPlaces(precision)))) {
        interval.push(i)
    }

    //Lower risk variant
    //interval.push(minimum);
    // for (let i = 1; i <count ; i++) {
    //     interval.push(interval[i-1] + precision)
    // }

    if (interval.length !== count) throw Error("Interval: count exceeds mapping length");

    return interval;
}