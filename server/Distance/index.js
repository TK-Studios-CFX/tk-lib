const { Config } = require("../Config");
const { InternalLogger } = require("../Logger");

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
	return Math.sqrt(X * X + Y * Y);
}

/**
 * Calculates the 3D distance between two points.
 *
 * @param {number} X1 - The X coordinate of the first point.
 * @param {number} Y1 - The Y coordinate of the first point.
 * @param {number} Z1 - The Z coordinate of the first point.
 * @param {number} X2 - The X coordinate of the second point.
 * @param {number} Y2 - The Y coordinate of the second point.
 * @param {number} Z2 - The Z coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
function Distance3D(X1, Y1, Z1, X2, Y2, Z3) {
	let X = X2 - X1;
	let Y = Y2 - Y1;
	let Z = Z3 - Z1;
	return Math.sqrt(X * X + Y * Y + Z * Z);
}

/**
 * Represents a 2D vector.
 * 
 * @param {number} X - The X coordinate of the vector.
 * @param {number} Y - The Y coordinate of the vector.
 * @returns {Object} - The 2D vector object.
 */
function Vector2(X, Y) {
    return {
        x: X,
        y: Y,
    }
}

/**
 * Represents a 3D vector.
 * 
 * @param {number} X - The X coordinate of the vector.
 * @param {number} Y - The Y coordinate of the vector.
 * @param {number} Z - The Z coordinate of the vector.
 * @returns {Object} - The 3D vector object.
 */
function Vector3(X, Y, Z) {
    return {
        x: X,
        y: Y,
        z: Z,
    }
}

/**
 * Represents a 4-dimensional vector.
 * 
 * @param {number} X - The X component of the vector.
 * @param {number} Y - The Y component of the vector.
 * @param {number} Z - The Z component of the vector.
 * @param {number} W - The W component of the vector.
 * @returns {Object} - The 4-dimensional vector object.
 */
function Vector4(X, Y, Z, W) {
    return {
        x: X,
        y: Y,
        z: Z,
        w: W,
    }
}

module.exports = {
	Distance2D,
    Distance3D,
    Vector2,
    Vector3,
    Vector4,
};
