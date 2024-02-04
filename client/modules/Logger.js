function getTag(tag, color, type, alias) {
	return `[${color}${tag}^0] [${color}${type.padEnd(7, " ")}^0] [${color}${alias}^0]`
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

		this.alias = `${this.pageName}`

		this.log = (...content) => {
			content.forEach(snippet => {
				console.log(getTag(this.resourceName, '^5', " INFO", this.alias), snippet);
			})
		}

		this.warn = (...content) => {
			content.forEach(snippet => {
				console.log(getTag(this.resourceName, '^3', " WARN", this.alias), snippet);
			})
		}

		this.error = (...content) => {
			content.forEach(snippet => {
				console.log(getTag(this.resourceName, '^1', " ERROR", this.alias), snippet);
			})
		}

		this.success = (...content) => {
			content.forEach(snippet => {
				console.log(getTag(this.resourceName, '^2', "SUCCESS", this.alias), snippet);
			})
		}
		
		this.alert = (...content) => {
			content.forEach(snippet => {
				console.log(getTag(this.resourceName, '^1', " ALERT", this.alias), snippet);
			})
		}

		this.debug = (...content) => {
			content.forEach(snippet => {
				console.log(getTag(this.resourceName, '^4', " DEBUG", this.alias), snippet);
			})
		}
	}
}

function Logger(resourceName, pageName) {
	return new LoggerClass(resourceName, pageName);
}

function GetLib_Logger() {
    return Logger
}

exports("GetLib_Logger", GetLib_Logger);

console.log("Loaded GetLib_Logger")