/**
 * A module that provides various mathematical functions.
 * @module Maths
 */

const Maths = {};

/**
 * Calculates the sum of an array of numbers.
 *
 * @param {number[]} InputArray - The array of numbers to calculate the sum.
 * @returns {number} The sum of the numbers in the array.
 */
Maths.SumArray = (InputArray) => {
    if (InputArray.length === 0) return 0;
    return InputArray.reduce((acc, val) => acc + val, 0);
}

/**
 * Calculates the average of an array of numbers.
 *
 * @param {number[]} InputArray - The array of numbers to calculate the average.
 * @returns {number} The average of the numbers in the array.
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

/**
 * Generates a random floating-point number between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random floating-point number between the minimum and maximum values.
 */
Maths.RandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

/**
 * Generates a random integer between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer between the minimum and maximum values.
 */
Maths.RandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { Maths };