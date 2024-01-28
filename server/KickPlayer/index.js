const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

function KickPlayer(src, reason) {
    InternalLogger.alert(`Kicked ${src} for: ${reason}`);
    return DropPlayer(src, reason);
}

module.exports = { KickPlayer };