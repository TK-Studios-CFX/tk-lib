const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

function GetPlayerIdentifier(src, type) {
    let Identifier = GetPlayerIdentifierByType(src, type);
    return Identifier ? Identifier : null;
}

module.exports = { GetPlayerIdentifier };