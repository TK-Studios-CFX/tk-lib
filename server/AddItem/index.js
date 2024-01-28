const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

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

module.exports = { AddItem };