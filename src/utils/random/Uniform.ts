


export const randomNumberInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);


export function uniformInteger(minimum: number, maximum: number, count: number):number[] {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(randomNumberInRange(minimum, maximum));
    }

    return array;
}