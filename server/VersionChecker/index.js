const { Config } = require("../Config");
const { InternalLogger } = require("../Logger");
const colors = require('colors');
const request = require("request");

let VersionsURL = "https://raw.githubusercontent.com/TK-Studios-CFX/tk-versions/main/data.json";

let Data = {};

async function GetVersionsData() {
    return new Promise((resolve, reject) => {
        request(VersionsURL, function (error, response, body) {
            if (error) return reject(error) && InternalLogger.error("Error fetching versions data url.");
            return resolve(JSON.parse(body));
        });
    });
}

function LineBreakLogo() {
    console.log(colors.cyan("============================ [ TK STUDIOS ] ============================"))
}

function LineBreak() {
    console.log(colors.cyan("========================================================================"))
}

function HighlightCyan(Text) {
    return colors.cyan(Text);
}

function HighlightBlue(Text) {
    return colors.blue(Text);
}

function FailedToFetchResource(ResourceName, CurrentVersion) {
    LineBreakLogo()
    console.log(colors.brightRed(`Unable to fetch resource version info for ${HighlightCyan(ResourceName)}`));
    console.log(colors.brightRed(`Current resource version: ${HighlightBlue('V ' + CurrentVersion)}`));
    console.log(colors.brightRed(`Finished booting resource with warnings.`));
    LineBreak()
}

async function CheckVersion(ResourceName, CurrentVersion) {
	if (!Data[ResourceName]) Data = await GetVersionsData();
	if (!Data[ResourceName]) return FailedToFetchResource(ResourceName, CurrentVersion);
	let Updates = Data[ResourceName];
    if (Updates.length == 0) return FailedToFetchResource(ResourceName, CurrentVersion);
    let Update = Updates[Updates.length-1];
	if (Update.version == CurrentVersion) {
        LineBreakLogo()
        console.log(`You are currently running on the latest version of ${HighlightCyan(ResourceName)} ${HighlightBlue('V ' + CurrentVersion)}`);
        console.log(`Finished booting resource successfully.`);
        LineBreak()
        return
    }
    LineBreakLogo()
    if (Update.critical) {
        console.log(`Critical Update Available for ${HighlightCyan(ResourceName)}. Current: ${HighlightBlue('V ' + CurrentVersion)} Available: ${HighlightBlue('V ' + Update.version)}`);
    } else {
        console.log(`Update Available for ${HighlightCyan(ResourceName)}. Current: ${HighlightBlue('V ' + CurrentVersion)} Available: ${HighlightBlue('V ' + Update.version)}`);
    }
    console.log(`Date Released: ${Update.date}`);
    console.log(`Changes:`);
    Update.changes.forEach(Change => {
        console.log(`- ${Change}`);
    })
    console.log(`Finished booting resource successfully.`);
    LineBreak()
}

function VersionChecker(ResourceName, CurrentVersion) {
    setTimeout(() => {
        CheckVersion(ResourceName, CurrentVersion);
    }, 3000)
}

/**
 * Retrieves the version of a resource.
 * 
 * @param {string} ResourceName - The name of the resource.
 * @returns {string} The version of the resource. Returns "Unknown" if the version metadata is not found.
 */
function GetResourceVersion(ResourceName) {
    let Metadata = GetNumResourceMetadata(ResourceName, 'version')
    if (Metadata != 1) return "Unknown";
    return GetResourceMetadata(ResourceName, 'version', 0)
}

/**
 * Ensures that the resource name matches the correct resource name.
 * If the current resource name does not match the correct resource name, a warning message is logged.
 * @param {string} CurrentResourceName - The current name of the resource.
 * @param {string} CorrectResourceName - The correct name of the resource.
 * @returns {void}
 */
function EnsureResourceName(CurrentResourceName, CorrectResourceName) {
    if (CurrentResourceName == CorrectResourceName) return;
    setTimeout(() => {
        LineBreakLogo()
        console.log(colors.brightRed(`${HighlightCyan(CorrectResourceName)} is currently named ${HighlightCyan(CurrentResourceName)}.`))
        console.log(colors.brightRed(`Please ensure that the resource is named correctly to avoid issues!`));
        LineBreak()
    }, 3000)
}

VersionChecker(GetCurrentResourceName(), GetResourceVersion(GetCurrentResourceName()));
EnsureResourceName(GetCurrentResourceName(), 'tk-lib');

module.exports = {
	VersionChecker,
    GetResourceVersion,
    EnsureResourceName,
};
