function findSymmetricValueInRange(value: number, minValue: number, maxValue: number): number {
    const midPoint = (minValue + maxValue) / 2;
    return midPoint - (value - midPoint);
}


export function normalValue(minValue: number, maxValue: number, iteration: number, numPoints: number) {
    return minValue + (maxValue - minValue) * (iteration / numPoints);
}

export function normalDistribution(currentValue: number, mean: number, stdDev: number): number {
    const twoSigmaSquare = 2 * stdDev * stdDev;
    const exponent = -((currentValue - mean) ** 2) / twoSigmaSquare;
    const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));

    return coefficient * Math.exp(exponent);
}

export function randomNormaliseArray(minimum: number, maximum: number, numPoints: number) {
    const currentValues: number[] = [];
    const pdfValue: number[] = [];
    //среднее значение
    const mean = findSymmetricValueInRange(0.0, minimum, maximum);
    const stdDev = 0.4;

    for (let i = 0; i <= numPoints; i++) {
        const currentValue = normalValue(minimum, maximum, i, numPoints);
        currentValues.push(currentValue);
        pdfValue.push(normalDistribution(currentValue, mean, stdDev))
    }

    return {currentValues, pdfValue};
}

export function normaliseArray(minimum: number, maximum: number, numPoints: number) {
    return randomNormaliseArray(minimum, maximum, numPoints).pdfValue;
}
