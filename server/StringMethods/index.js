/**
 * A module that provides various string manipulation methods.
 * 
 * @module StringMethods
 */

const { InternalLogger } = require("../Logger");

const StringMethods = {};

/**
 * Converts a string to lowercase.
 * 
 * @param {string} input - The input string.
 * @returns {string} - The lowercase string.
 */
StringMethods.toLowerCase = (input) => {
    if (typeof input !== 'string') return InternalLogger.error("Input for toLowerCase must be a string.")
    return input.toUpperCase();
}

/**
 * Converts a string to uppercase.
 * 
 * @param {string} input - The input string.
 * @returns {string} - The uppercase string.
 */
StringMethods.toUpperCase = (input) => {
    if (typeof input !== 'string') return InternalLogger.error("Input for toUpperCase must be a string.")
    return input.toUpperCase();
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param {string} input - The input string.
 * @returns {string} - The string with the first letter capitalized.
 */
StringMethods.CapitalizeFirstLetter = (input) => {
    if (typeof input !== 'string') return InternalLogger.error("Input for CapitalizeFirstLetter must be a string.")
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

/**
 * Sanitizes a string by removing any characters that are not alphanumeric, space, period, comma, underscore, or hyphen.
 * 
 * @param {string} input - The input string.
 * @returns {string} - The sanitized string.
 */
StringMethods.Sanitize = (input) => {
    input = input.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return input.trim();
}

module.exports = { StringMethods };