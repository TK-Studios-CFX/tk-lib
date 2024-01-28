const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

/**
 * Calculates the Euclidean distance between two points in a 2D plane.
 * 
 * @param {number} X1 - The x-coordinate of the first point.
 * @param {number} Y1 - The y-coordinate of the first point.
 * @param {number} X2 - The x-coordinate of the second point.
 * @param {number} Y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
function Distance2D(X1, Y1, X2, Y2) {
    let X = X2 - X1;
    let Y = Y2 - Y1;
    return Math.sqrt(X * X + Y * Y)
}

module.exports = { Distance2D };