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
};

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
};

/**
 * Finds the maximum value in an array of numbers.
 *
 * @param {number[]} InputArray - The array of numbers to find the maximum value from.
 * @returns {number|undefined} The maximum value in the array, or undefined if the array is empty.
 */
Maths.MaxArray = (InputArray) => {
	if (InputArray.length === 0) return undefined;
	return Math.max(...InputArray);
};

/**
 * Generates a random floating-point number between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random floating-point number between the minimum and maximum values.
 */
Maths.RandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
};

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
};

/**
 * Generates a boolean with a 50% chance of being true.
 *
 * @returns {boolean} A random boolean.
 */
Maths.RandomBool = () => {
	return Math.random() < 0.5;
};

/**
 * Calculates the Euclidean distance between two points in a 2D plane.
 *
 * @param {number} X1 - The x-coordinate of the first point.
 * @param {number} Y1 - The y-coordinate of the first point.
 * @param {number} X2 - The x-coordinate of the second point.
 * @param {number} Y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
Maths.Distance2D = (X1, Y1, X2, Y2) => {
	let X = X2 - X1;
	let Y = Y2 - Y1;
	return Math.sqrt(X * X + Y * Y);
};

/**
 * Calculates the Euclidean distance between two points in a 2D plane.
 *
 * @param {Vector2} Pos1 - The Vector2 of the first point.
 * @param {Vector2} Pos2 - The Vector2 of the second point.
 * @returns {number} The distance between the two points.
 */
Maths.DistanceVector2 = (Pos1, Pos2) => {
	let X = Pos2.x - Pos1.x;
	let Y = Pos2.y - Pos1.y;
	return Math.sqrt(X * X + Y * Y);
};

/**
 * Calculates the 3D distance between two positions.
 *
 * @param {number} X1 - The X coordinate of the first positions.
 * @param {number} Y1 - The Y coordinate of the first positions.
 * @param {number} Z1 - The Z coordinate of the first positions.
 * @param {number} X2 - The X coordinate of the second positions.
 * @param {number} Y2 - The Y coordinate of the second positions.
 * @param {number} Z2 - The Z coordinate of the second positions.
 * @returns {number} The distance between the two positions.
 */
Maths.Distance3D = (X1, Y1, Z1, X2, Y2, Z3) => {
	let X = X2 - X1;
	let Y = Y2 - Y1;
	let Z = Z3 - Z1;
	return Math.sqrt(X * X + Y * Y + Z * Z);
};

/**
 * Calculates the Euclidean distance between two positions in a 3D plane.
 *
 * @param {Vector3} Pos1 - The Vector3 of the first positions.
 * @param {Vector3} Pos2 - The Vector3 of the second positions.
 * @returns {number} The distance between the two positions.
 */
Maths.DistanceVector3 = (Pos1, Pos2) => {
	let X = Pos2.x - Pos1.x;
	let Y = Pos2.y - Pos1.y;
	let Z = Pos2.z - Pos2.z;
	return Math.sqrt(X * X + Y * Y + Z * Z);
};

/**
 * Represents a 2D vector.
 *
 * @param {number} X - The X coordinate of the vector.
 * @param {number} Y - The Y coordinate of the vector.
 * @returns {Object} - The 2D vector object.
 */
Maths.Vector2 = (X, Y) => {
	return {
		x: X,
		y: Y,
	};
};

/**
 * Represents a 3D vector.
 *
 * @param {number} X - The X coordinate of the vector.
 * @param {number} Y - The Y coordinate of the vector.
 * @param {number} Z - The Z coordinate of the vector.
 * @returns {Object} - The 3D vector object.
 */
Maths.Vector3 = (X, Y, Z) => {
	return {
		x: X,
		y: Y,
		z: Z,
	};
};

/**
 * Represents a 4-dimensional vector.
 *
 * @param {number} X - The X component of the vector.
 * @param {number} Y - The Y component of the vector.
 * @param {number} Z - The Z component of the vector.
 * @param {number} W - The W component of the vector.
 * @returns {Object} - The 4-dimensional vector object.
 */
Maths.Vector4 = (X, Y, Z, W) => {
	return {
		x: X,
		y: Y,
		z: Z,
		w: W,
	};
};


Maths.FormatAsCurrency = (Amount = 0, CurrencyCode = "USD") => {
	if (typeof Amount !== "number") return InternalLogger.error("Amount must be a number");
	const validCurrencyCodes = [
        "USD",
        "EUR",
        "GBP",
        "AUD",
        "CAD",
        "JPY",
        "CHF",
        "CNY",
        "SEK",
        "NZD",
        "NOK",
        "MXN",
        "SGD",
        "HKD",
        "KRW",
        "TRY",
        "INR",
        "RUB",
        "BRL",
        "ZAR",
        "PLN",
	];
	if (!validCurrencyCodes.includes(CurrencyCode)) InternalLogger.error("Invalid currency code");
	return Amount.toLocaleString("en-US", { style: "currency", currency: CurrencyCode });
};

module.exports = { Maths };
