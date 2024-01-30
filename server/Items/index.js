const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');
const QBCore = global.exports["qb-core"].GetCoreObject();

/**
 * Checks if a player has a certain item in a specified quantity.
 * 
 * @param {number} source - The source identifier of the player.
 * @param {string} item - The item to check for.
 * @param {number} quantity - The desired quantity of the item.
 * @returns {boolean} - Returns true if the player has the item in the specified quantity, false otherwise.
 */
function HasItem(source, item, quantity) {
	let Player = QBCore.Functions.GetPlayer(source);
	if (!Player) return false
	return Player.Functions.HasItem(item, quantity);
}

/**
 * Adds an item to the inventory of a player.
 * 
 * @param {string} source - The source of the player.
 * @param {string} item - The item to add.
 * @param {number} amount - The amount of the item to add.
 * @param {number} slot - The slot where the item should be added.
 * @param {object} info - Additional information about the item.
 * @returns {any} - The result of adding the item to the inventory.
 */
function AddItem(source, item, amount, slot, info) {
	TriggerEvent('tk-lib:server:log', 'info', `Giving ${amount} x ${item} to ${source}`);
	if (!Config.Inventory) return InternalLogger.error(`No valid inventory configuration option.`)
	if (Config.Inventory == "qb") {
		return global.exports["qb-inventory"].AddItem(source, item, amount, slot, info);
	}
	if (Config.Inventory == "qs") {
		return global.exports["qs-inventory"].AddItem(source, item, amount, slot, info);
	}
	return InternalLogger.error(`${Config.Inventory} is not a valid inventory configuration option.`)
}

/**
 * Removes a specified quantity of an item from a player's inventory.
 * 
 * @param {number} source - The source identifier of the player.
 * @param {string} item - The name of the item to be removed.
 * @param {number} quantity - The quantity of the item to be removed.
 * @returns {boolean} - Returns true if the item was successfully removed, false otherwise.
 */
function RemoveItem(source, item, quantity) {
	let Player = QBCore.Functions.GetPlayer(source);
	if (!Player) return false
	InternalLogger.log(`Removing ${quantity} x ${item} from ${source}`);
	return Player.Functions.RemoveItem(item, quantity);
}

/**
 * Opens a stash for a player.
 * 
 * @param {string} src - The source of the player.
 * @param {string} StashName - The name of the stash.
 * @param {number} Slots - The number of slots in the stash.
 * @param {number} Capacity - The maximum weight capacity of the stash.
 * @returns {void}
 */
async function OpenStash(src, StashName, Slots, Capacity) {
	if (!Config.Inventory) return InternalLogger.error(`No valid inventory configuration option.`)
	if (Config.Inventory == "qb") {
		return global.exports["qb-inventory"].OpenInventory("stash", StashName, {
			maxweight: Capacity,
			slots: Slots,
		}, src)
	}
	if (Config.Inventory == "qs") {
		return global.exports["qs-inventory"].RegisterStash(src, StashName, Slots, Capacity);
	}
	
	return InternalLogger.error(`${Config.Inventory} is not a valid inventory configuration option.`)
}

module.exports = { 
	HasItem,
	AddItem,
	RemoveItem,

	OpenStash,
};