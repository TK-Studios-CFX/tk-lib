const Lib = {};

Lib.Config = {
    Debug: true,
}

Lib.Functions = {};

Lib.Functions.Wait = async (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}

Lib.Functions.Logger = global.exports['tk-lib'].GetLib_Logger();

Lib.Maths = global.exports['tk-lib'].GetLib_Maths();

function GetLib() {
	return Lib;
}

exports("GetLib", GetLib);

// Exports.Add("GetLib", GetLib);

console.log("Exporting")

// if (Config.Debug) {

// 	let InternalLogger = Logger("TK-Lib", "Main");

// 	for (const Method in Lib.Functions) {
// 		InternalLogger.debug(`Method Loaded: Lib.Functions.${Method}`);
// 	}
	
// 	for (const Method in Lib.Time) {
// 		InternalLogger.debug(`Method Loaded: Lib.Time.${Method}`);
// 	}

// 	for (const Method in Lib.Maths) {
// 		InternalLogger.debug(`Method Loaded: Lib.Maths.${Method}`);
// 	}

// 	for (const Method in Lib.StringMethods) {
// 		InternalLogger.debug(`Method Loaded: Lib.StringMethods.${Method}`);
// 	}

// }

// Logger("TK-Lib", "Main").debug("Booted TK-Lib");