
export function mutation(binary: number[], count: number): number[] {
    const mutated: number[] = binary.slice();

    for (let i = 0; i < count; i++) {
        const selectedIndex = Math.floor(Math.random() * binary.length);

        mutated[selectedIndex] = mutated[selectedIndex] ^ 1;
    }
    return mutated;
}
