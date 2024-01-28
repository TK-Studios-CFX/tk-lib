const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');
const QBCore = global.exports["qb-core"].GetCoreObject();

function GetPlayersArray() {
	if (Config.Framework == "qb-core") return QBCore.Functions.GetPlayers();
    InternalLogger.error(`${Config.Framework} is not a valid Config.Framework option.`)
    return [];
}

module.exports = { GetPlayersArray };