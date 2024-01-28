const { Config } = require('../Config');

const Maths = {};

/**
 * Calculates the sum of an array of numbers.
 *
 * @param {number[]} InputArray - The array of numbers to calculate the sum.
 * @returns {number} The sum of the numbers in the array.
 */
Maths.AverageArray = (InputArray) => {
    if (InputArray.length === 0) return 0;
    const sum = InputArray.reduce((acc, val) => acc + val, 0);
    return sum / InputArray.length;
};

/**
 * Finds the minimum value in an array of numbers.
 *
 * @param {number[]} InputArray - The array of numbers to find the minimum value from.
 * @returns {number|undefined} The minimum value in the array, or undefined if the array is empty.
 */
Maths.MinArray = (InputArray) => {
    if (InputArray.length === 0) return undefined;
    return Math.min(...InputArray);
}

/**
 * Finds the maximum value in an array of numbers.
 *
 * @param {number[]} InputArray - The array of numbers to find the maximum value from.
 * @returns {number|undefined} The maximum value in the array, or undefined if the array is empty.
 */
Maths.MaxArray = (InputArray) => {
    if (InputArray.length === 0) return undefined;
    return Math.max(...InputArray);
}

module.exports = { Maths };