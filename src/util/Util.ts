
/**
 * Get a random integer, min is inclusive, max is exclusive.
 * @param min inclusive integer
 * @param max excluseive integer
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

/**
 * Get a percentage from ratio of two numbers.
 * @param numerator top of fraction, dividend
 * @param denominator bottom of fraction, divisor
 */
export function convertFractionToPercentage(numerator: number, denominator: number) {
    return Math.round((numerator / denominator) * 100);
}