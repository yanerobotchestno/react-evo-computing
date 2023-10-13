export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uniformInteger(minimum: number, maximum: number, count: number):number[] {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(getRandomInt(minimum, maximum));
    }

    return array;
}