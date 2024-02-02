const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

/**
 * Retrieves the identifiers associated with a player.
 * 
 * @param {string} src - The source of the player.
 * @returns {string[]} - An array of player identifiers.
 */
function GetPlayerIdentifiers(src) {
	let numIdentifiers = GetNumPlayerIdentifiers(src);
    let PlayerIdentifiers = [];
	for (let j = 0; j < numIdentifiers; j++) {
        PlayerIdentifiers.push(GetPlayerIdentifier(src, j));
	}
    return PlayerIdentifiers
};

/**
 * Retrieves the player identifier based on the given source and identifier type.
 * 
 * @param {string} src - The source of the player.
 * @param {string} type - The type of identifier to retrieve.
 * @returns {string|null} The player identifier, or null if not found.
 */
function GetPlayerIdentifier(src, type) {
    let Identifier = GetPlayerIdentifierByType(src, type);
    return Identifier ? Identifier : null;
};

/**
 * Retrieves the stripped player identifier based on the given identifier type.
 * 
 * @param {string} src - The source of the player.
 * @param {string} type - The identifier type.
 * @returns {string|null} The stripped player identifier, or null if not found.
 */
function GetStrippedPlayerIdentifier(src, type) {
    let Identifier = GetPlayerIdentifierByType(src, type);
    return Identifier ? Identifier.replace(`${type}:`, "") : null;
}

module.exports = { 
    GetPlayerIdentifiers,
    GetPlayerIdentifier,
    GetStrippedPlayerIdentifier,
};
