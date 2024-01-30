const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

/**
 * Waits for the specified amount of time.
 * 
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<boolean>} - A promise that resolves to true after the specified time has elapsed.
 */
async function Wait (ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}

module.exports = { Wait };