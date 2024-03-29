const { Config } = require("../Config");
const colors = require('colors');

function getTag(tag, colour, type) {
	return `[${colors.cyan(tag)}] [${colour(type)}]`
}

class LoggerClass {
	/**
	 * Creates a new Logger instance.
	 * 
	 * @param {string} resourceName - The name of the resource.
	 * @param {string} fileName - The name of the file.
	 */
	constructor(resourceName = "TK-Lib", pageName = "N/A") {
		this.resourceName = resourceName.padEnd(12, " ");
		this.pageName = pageName.padEnd(12, " ");

		this.alias = `[${colors.cyan(this.pageName)}]`

		this.log = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.cyan, "INFO")} ${this.alias}`, snippet);
			})
		}

		this.warn = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.yellow, "WARN")} ${this.alias}`, snippet);
			})
		}

		this.error = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.brightRed, "ERROR")} ${this.alias}`, colors.brightRed(snippet));
			})
		}

		this.success = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.brightGreen, "SUCCESS")} ${this.alias}`, snippet);
			})
		}
		
		this.alert = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.bgRed, "ALERT")} ${this.alias}`, snippet);
			})
		}

		this.debug = (...content) => {
			if (!Config.Debug) return;
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.bgCyan, "DEBUG")} ${this.alias}`, snippet);
			})
		}

		this.trace = (...content) => {
			content.forEach(snippet => {
				console.trace(`${getTag(this.resourceName, colors.red, "DEBUG")} ${this.alias}`, snippet);
			})
		}
	}
}

class InternalLoggerClass extends LoggerClass {
	constructor(resourceName = "TK-Lib", pageName = "N/A") {
		super(resourceName, pageName);

		this.database = (...content) => {
			if (!Config.LogDatabaseQueries) return;
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.bgMagenta, "DATABASE")} ${this.alias}`, snippet);
			})
		}

		this.databaseError = (...content) => {
			content.forEach(snippet => {
				console.log(`${getTag(this.resourceName, colors.bgRed, "DATABASE ERROR")} ${this.alias}`, snippet);
			})
		}
	}
}

function Logger(resourceName, pageName) {
	return new LoggerClass(resourceName, pageName);
}

RegisterNetEvent('tk-lib:server:log')
onNet("tk-lib:server:log", (Type, Log) => {
	let Resource = GetInvokingResource();
	let LocalLogger = Logger(Resource, "Network");
	if (Type == "log") return LocalLogger.log(Log);
	if (Type == "info") return LocalLogger.log(Log);
	if (Type == "warn") return LocalLogger.warn(Log);
	if (Type == "error") return LocalLogger.error(Log);
	if (Type == "alert") return LocalLogger.alert(Log);
	if (Type == "debug") return LocalLogger.debug(Log);
	if (Type == "trace") return LocalLogger.trace(Log);
	return LocalLogger.error(`Unsupported log type: ${Type}`);
});

const InternalLogger = new InternalLoggerClass("tk-lib", "Internal")

module.exports = { Logger, InternalLogger };