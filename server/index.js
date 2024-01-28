const Lib = {};

const { Config } = require("./server/config");
Lib.Config = Config;

Lib.Functions = {};

/**
 * Creates a new Logger instance.
 * 
 * @param {string} resourceName - The name of the resource.
 * @param {string} pageName - The name of the page.
 * @returns {LoggerClass} A new Logger instance. [ .log .warn .error .success .alert .debug .trace ]
 */
const { Logger } = require("./server/Logger");
Lib.Functions.Logger = Logger;

/**
 * Notifies a client with a message.
 * 
 * @param {number} src - The client source ID.
 * @param {string} type - The type of notification.
 * @param {string} message - The message to be displayed.
 * @param {number} [length=5000] - The duration of the notification in milliseconds.
 * @returns {void}
 */
const { Notify } = require("./server/Notify");
Lib.Functions.Notify = Notify;

/**
 * Adds an item to the inventory of a player.
 * 
 * @param {number} source - The player's source ID.
 * @param {string} item - The item to add.
 * @param {number} amount - The amount of the item to add.
 * @param {number} slot - The slot to add the item to.
 * @param {object} info - Additional information about the item.
 * @returns {boolean} - Returns true if the item was successfully added, false otherwise.
 */
const { AddItem } = require("./server/AddItem");
Lib.Functions.AddItem = AddItem;

/**
 * Removes a specified quantity of an item from a player's inventory.
 * 
 * @param {number} source - The player's source ID.
 * @param {string} item - The name of the item to remove.
 * @param {number} quantity - The quantity of the item to remove.
 * @returns {boolean} - Returns true if the item was successfully removed, false otherwise.
 */
const { RemoveItem } = require("./server/RemoveItem");
Lib.Functions.RemoveItem = RemoveItem; 

/**
 * Retrieves an array of players based on the selected framework.
 * 
 * @returns {Array} An array of players.
 */
const { GetPlayersArray } = require("./server/GetPlayersArray");
Lib.Functions.GetPlayersArray = GetPlayersArray; 

/**
 * Retrieves the player identifier based on the given source and type.
 * 
 * @param {number} src - The source of the player.
 * @param {string} type - The type of identifier to retrieve.
 * @returns {string} The player identifier, or null if not found.
 */
const { GetPlayerIdentifier } = require("./server/GetPlayerIdentifier");
Lib.Functions.GetPlayerIdentifier = GetPlayerIdentifier; 

/**
 * Kicks a player from the server.
 * 
 * @param {string} src - The player's source identifier.
 * @param {string} reason - The reason for kicking the player.
 * @returns {boolean} - Returns true if the player was successfully kicked, false otherwise.
 */
const { KickPlayer } = require("./server/KickPlayer");
Lib.Functions.KickPlayer = KickPlayer; 

/**
 * Checks the version of a resource against the latest available version.
 * 
 * @param {string} ResourceName - The name of the resource.
 * @param {string} CurrentVersion - The current version of the resource.
 * @returns {void}
 */
const { VersionChecker } = require("./server/VersionChecker");
Lib.Functions.VersionChecker = VersionChecker;

function GetLib() {
	return Lib;
}

exports("GetLib", GetLib);

Logger("TK-Lib", "Main").log("Booted TK-Lib");
