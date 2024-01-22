const colors = require('colors');
const Config = require('../config');

function getTag(tag, colour, type) {
	return `[${colors.green(tag)}] [${colour(type)}]`
}
class Logger {
	constructor(resourceName = "TK-Lib", pageName = "N/A") {
		this.resourceName = resourceName.padEnd(12, " ");
		this.pageName = pageName.padEnd(12, " ");

		this.alias = `[${colors.green(this.pageName)}]`

		this.log = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.green, "INFO")} ${this.alias}`, snippet);
			})
		}

		this.warn = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.yellow, "WARN")} ${this.alias}`, snippet);
			})
		}

		this.error = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.red, "ERROR")} ${this.alias}`, snippet);
			})
		}
		
		this.alert = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.bgRed, "ALERT")} ${this.alias}`, snippet);
			})
		}

		this.debug = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.bgMagenta, "DEBUG")} ${this.alias}`, snippet);
			})
		}

		this.trace = (...content) => {
			content.forEach(snippet => {
				console.trace(`${getTag(this.resourceName, colors.red, "DEBUG")} ${this.alias}`, snippet);
			})
		}
	}
}

function createLogger(resourceName, pageName) {
	return new Logger(resourceName, pageName);
}

// let Test = createLogger("TK-Test", "Main");
// Test.log("This is a test log");
// Test.warn("This is a test warn");
// Test.error("This is a test error");
// Test.alert("This is a test alert");
// Test.debug("This is a test debug message");
// Test.trace("This is a test trace");

RegisterNetEvent('tk-lib:server:log')
onNet("tk-lib:server:log", (Type, Log) => {
	let Resource = GetInvokingResource();
	let LocalLogger = createLogger(Resource, "Network");
	if (Type == "log") return LocalLogger.log(Log);
	if (Type == "info") return LocalLogger.log(Log);
	if (Type == "warn") return LocalLogger.warn(Log);
	if (Type == "error") return LocalLogger.error(Log);
	if (Type == "alert") return LocalLogger.alert(Log);
	if (Type == "debug") return LocalLogger.debug(Log);
	if (Type == "trace") return LocalLogger.trace(Log);
	return LocalLogger.error(`Unsupported log type: ${Type}`)
});

module.exports = createLogger;