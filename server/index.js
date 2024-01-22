const logger = require('./server/logger');
exports("logger", logger);
logger("TK-Lib", "Main").log("Exported 'logger'");

const {
    notify,
    addItem,
} = require('./server/utils');

exports("notify", notify);
logger("TK-Lib", "Main").log("Exported 'notify'");

exports("addItem", addItem);
logger("TK-Lib", "Main").log("Exported 'addItem'");

// const {
//     dbManager,
//     test
// } = require('./server/db');
// exports("test", test);
// logger("TK-Lib", "Main").log("Exported 'test'");

// exports("dbManager", dbManager)
// logger("TK-Lib", "Main").log("Exported 'dbManager'");

logger("TK-Lib", "Main").log("Finished booting TK-Lib");