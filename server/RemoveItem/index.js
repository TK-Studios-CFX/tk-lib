const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');
const QBCore = global.exports["qb-core"].GetCoreObject();

function RemoveItem(source, item, quantity) {
	let Player = QBCore.Functions.GetPlayer(source);
	if (!Player) return false
	InternalLogger.log(`Removing ${quantity} x ${item} from ${source}`);
	return Player.Functions.RemoveItem(item, quantity);
}

RegisterNetEvent('tk-lib:server:RemoveItem');
onNet("tk-lib:server:RemoveItem", (source, item, amount, slot, info) => {
	return RemoveItem(source, item, quantity)
});

module.exports = { 
	RemoveItem,
};