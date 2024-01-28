const { Config } = require("../Config");
const { InternalLogger } = require("../Logger");
const QBCore = global.exports["qb-core"].GetCoreObject();

/**
 * Retrieves the amount of money of a specific type for a player.
 * 
 * @param {number} src - The source identifier of the player.
 * @param {string} type - The type of money to retrieve.
 * @returns {number} The amount of money of the specified type for the player.
 */
function GetMoney(src, type) {
    let Player = QBCore.Functions.GetPlayer(src);
    let Money = Player.PlayerData.money[type] || 0;
	return Money
}

/**
 * Sets the money for a given source and type.
 *
 * @param {any} src - The source object.
 * @param {string} type - The type of money.
 * @param {number} amount - The amount of money to set.
 * @returns {void}
 */
function SetMoney(src, type, amount) {
    InternalLogger.alert("FEATURE NOT IMPLEMENTED YET");
	return;
}

/**
 * Adds money to a player's account.
 * 
 * @param {number} src - The player's source ID.
 * @param {string} type - The type of money to add.
 * @param {number} amount - The amount of money to add.
 * @param {string} reason - The reason for adding the money.
 * @returns {boolean} - Returns true if the money was successfully added, false otherwise.
 */
function AddMoney(src, type, amount, reason) {
    let Player = QBCore.Functions.GetPlayer(src);
    if (!Player) return false;
    return Player.AddMoney(type.toLowerCase(), Math.floor(amount), reason)
}

/**
 * Removes money from a player's account.
 * 
 * @param {number} src - The player's source ID.
 * @param {string} type - The type of money to remove.
 * @param {number} amount - The amount of money to remove.
 * @param {string} reason - The reason for removing the money.
 * @returns {boolean} - Returns true if the money was successfully removed, false otherwise.
 */
function RemoveMoney(src, type, amount, reason) {
    let Player = QBCore.Functions.GetPlayer(src);
    if (!Player) return false;
    return Player.RemoveMoney(type.toLowerCase(), Math.floor(amount), reason)
}

module.exports = {
	GetMoney,
	SetMoney,
	AddMoney,
	RemoveMoney,
};
