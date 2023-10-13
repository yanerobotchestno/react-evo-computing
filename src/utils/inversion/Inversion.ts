import {getRandomInt} from "../random/Uniform";

export function inversion(array:number[]):number[] {
    const splitPosition =  getRandomInt(1, array.length);
    return array.slice(splitPosition, array.length).concat(array.slice(0, splitPosition));
}