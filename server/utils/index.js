const Config = require('../config');

function notify(src, type, message, length) {
	console.log(message);
	if (src == 0) return;
	return TriggerClientEvent('QBCore:Notify', src, {
		text: "TK Core",
		caption: message
	}, type, length || 5000)
}

function addItem(source, item, amount, slot, info) {
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

RegisterNetEvent('tk-lib:server:addItem');
onNet("tk-lib:server:addItem", (source, item, amount, slot, info) => {
	return addItem(source, item, amount, slot, info)
});

module.exports = { 
    notify,
	addItem,
};