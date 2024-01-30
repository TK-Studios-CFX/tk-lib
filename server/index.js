const Lib = {};

const { Config } = require("./server/Config");
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
 * Checks if a player has a certain item in a specified quantity.
 * 
 * @param {number} source - The source identifier of the player.
 * @param {string} item - The item to check for.
 * @param {number} quantity - The desired quantity of the item.
 * @returns {boolean} - Returns true if the player has the item in the specified quantity, false otherwise.
 */
const { HasItem } = require("./server/Items");
Lib.Functions.HasItem = HasItem;

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
const { AddItem } = require("./server/Items");
Lib.Functions.AddItem = AddItem;

/**
 * Opens a stash for a player.
 * 
 * @param {string} src - The source of the player.
 * @param {string} StashName - The name of the stash.
 * @param {number} Slots - The number of slots in the stash.
 * @param {number} Capacity - The maximum weight capacity of the stash.
 * @returns {void}
 */
const { OpenStash } = require("./server/Items");
Lib.Functions.OpenStash = OpenStash;


/**
 * Removes a specified quantity of an item from a player's inventory.
 * 
 * @param {number} source - The source identifier of the player.
 * @param {string} item - The name of the item to be removed.
 * @param {number} quantity - The quantity of the item to be removed.
 * @returns {boolean} - Returns true if the item was successfully removed, false otherwise.
 */
const { RemoveItem } = require("./server/Items");
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

/**
 * Retrieves the version of a resource.
 * 
 * @param {string} ResourceName - The name of the resource.
 * @returns {string} The version of the resource. Returns "Unknown" if the version metadata is not found.
 */
const { GetResourceVersion } = require("./server/VersionChecker");
Lib.Functions.GetResourceVersion = GetResourceVersion;

/**
 * Ensures that the resource name matches the correct resource name.
 * If the current resource name does not match the correct resource name, a warning message is logged.
 * 
 * @param {string} CurrentResourceName - The current name of the resource.
 * @param {string} CorrectResourceName - The correct name of the resource.
 * @returns {void}
 */
const { EnsureResourceName } = require("./server/VersionChecker");
Lib.Functions.EnsureResourceName = EnsureResourceName;

/**
 * Retrieves the 2D vector of a player.
 *
 * @param {number} src - The source of the player.
 * @returns {Vector2} - The player's position as a Vector2.
 */
const { GetPlayerVector2 } = require("./server/PlayerPosition");
Lib.Functions.GetPlayerVector2 = GetPlayerVector2;

/**
 * Retrieves the 3D vector of a player.
 *
 * @param {number} src - The source of the player.
 * @returns {Vector3} - The player's position as a Vector3.
 */
const { GetPlayerVector3 } = require("./server/PlayerPosition");
Lib.Functions.GetPlayerVector3 = GetPlayerVector3;

/**
 * Retrieves the position and heading of a player as a Vector4.
 * 
 * @param {number} src - The player source identifier.
 * @returns {Vector4} The player's position and heading as a Vector4.
 */
const { GetPlayerVector4 } = require("./server/PlayerPosition");
Lib.Functions.GetPlayerVector4 = GetPlayerVector4;

/**
 * Retrieves the amount of money of a specific type for a player.
 * 
 * @param {number} src - The source identifier of the player.
 * @param {string} type - The type of money to retrieve.
 * @returns {number} The amount of money of the specified type for the player.
 */
const { GetMoney } = require("./server/Money");
Lib.Functions.GetMoney = GetMoney;

/**
 * Sets the money for a given source and type.
 *
 * @param {any} src - The source object.
 * @param {string} type - The type of money.
 * @param {number} amount - The amount of money to set.
 * @returns {void}
 */
const { SetMoney } = require("./server/Money");
Lib.Functions.SetMoney = SetMoney;

/**
 * Adds money to a player's account.
 * 
 * @param {number} src - The player's source ID.
 * @param {string} type - The type of money to add.
 * @param {number} amount - The amount of money to add.
 * @param {string} reason - The reason for adding the money.
 * @returns {boolean} - Returns true if the money was successfully added, false otherwise.
 */
const { AddMoney } = require("./server/Money");
Lib.Functions.AddMoney = AddMoney;

/**
 * Removes money from a player's account.
 * 
 * @param {number} src - The player's source ID.
 * @param {string} type - The type of money to remove.
 * @param {number} amount - The amount of money to remove.
 * @param {string} reason - The reason for removing the money.
 * @returns {boolean} - Returns true if the money was successfully removed, false otherwise.
 */
const { RemoveMoney } = require("./server/Money");
Lib.Functions.RemoveMoney = RemoveMoney;

/**
 * Waits for the specified amount of time.
 * 
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<boolean>} - A promise that resolves to true after the specified time has elapsed.
 */
const { Wait } = require("./server/Wait");
Lib.Functions.Wait = Wait;

/**
 * See the "Time" module for detailed documentation.
 */
const { Time } = require("./server/Time");
Lib.Time = Time;

/**
 * See the "Maths" module for detailed documentation.
 */
const { Maths } = require("./server/Maths");
Lib.Maths = Maths;

/**
 * See the "Buckets" module for detailed documentation.
 */
const { Buckets } = require("./server/Buckets");
Lib.Buckets = Buckets;

/**
 * See the "Strings" module for detailed documentation.
 */
const { StringMethods } = require("./server/StringMethods");
Lib.StringMethods = StringMethods;

/**
 * See the "DB" module for detailed documentation.
 */
const { DB } = require("./server/DB");
Lib.DB = DB;


function GetLib() {
	return Lib;
}

exports("GetLib", GetLib);

if (Config.Debug) {

	let InternalLogger = Logger("TK-Lib", "Main");

	for (const Method in Lib.Functions) {
		InternalLogger.debug(`Method Loaded: Lib.Functions.${Method}`);
	}
	
	for (const Method in Lib.Time) {
		InternalLogger.debug(`Method Loaded: Lib.Time.${Method}`);
	}

	for (const Method in Lib.Maths) {
		InternalLogger.debug(`Method Loaded: Lib.Maths.${Method}`);
	}

	for (const Method in Lib.StringMethods) {
		InternalLogger.debug(`Method Loaded: Lib.StringMethods.${Method}`);
	}

	for (const Method in Lib.DB) {
		InternalLogger.debug(`Method Loaded: Lib.DB.${Method}`);
	}

}

Logger("TK-Lib", "Main").debug("Booted TK-Lib");