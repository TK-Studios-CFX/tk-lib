const { Config } = require('../Config');

function Notify(src, type, message, length) {
	if (src == 0) return;
	return TriggerClientEvent('QBCore:Notify', src, {
		text: "TK Studios",
		caption: message
	}, type, length || 5000)
}

module.exports = { Notify };