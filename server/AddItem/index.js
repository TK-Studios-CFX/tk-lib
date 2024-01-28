const { Config } = require('../Config');

function AddItem(source, item, amount, slot, info) {
	TriggerEvent('tk-lib:server:log', 'info', `Giving ${amount} x ${item} to ${source}`);
	if (!Config.inventory) return TriggerEvent('tk-lib:server:log', 'error', `No valid inventory configuration option.`)
	if (Config.inventory == "qb") {
		return global.exports["qb-inventory"].AddItem(source, item, amount, slot, info);
	}
	if (Config.inventory == "qs") {
		return global.exports["qs-inventory"].AddItem(source, item, amount, slot, info);
	}
	return TriggerEvent('tk-lib:server:log', 'error', `${Config.inventory} is not a valid inventory configuration option.`)
}

RegisterNetEvent('tk-lib:server:AddItem');
onNet("tk-lib:server:AddItem", (source, item, amount, slot, info) => {
	return AddItem(source, item, amount, slot, info)
});

module.exports = { AddItem };