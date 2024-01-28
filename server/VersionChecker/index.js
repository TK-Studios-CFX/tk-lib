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
    console.log(colors.green("=========================== [ TK STUDIOS ] ==========================="))
}

function LineBreak() {
    console.log(colors.green("======================================================================"))
}

function Highlight(Text) {
    return colors.blue(Text);
}

async function CheckVersion(ResourceName, CurrentVersion) {
	if (!Data[ResourceName]) Data = await GetVersionsData();
	if (!Data[ResourceName]) return InternalLogger.alert(`Unable to fetch resource version info for ${ResourceName}`);
	let Updates = Data[ResourceName];
    if (Updates.length == 0) return InternalLogger.alert(`Unable to fetch resource version info for ${ResourceName}`);
    let Update = Updates[Updates.length-1];
	if (Update.version == CurrentVersion) {
        LineBreakLogo()
        console.log(`You are currently running on the latest version of ${Highlight(ResourceName)} ${Highlight('V ' + CurrentVersion)}`);
        LineBreak()
        return
    }
    LineBreakLogo()
    if (Update.critical) {
        console.log(`Critical Update Available for ${Highlight(ResourceName)}. Current: ${Highlight('V ' + CurrentVersion)} Available: ${Highlight('V ' + Update.version)}`);
    } else {
        console.log(`Update Available for ${Highlight(ResourceName)}. Current: ${Highlight('V ' + CurrentVersion)} Available: ${Highlight('V ' + Update.version)}`);
    }
    console.log(`Date Released: ${Update.date}`);
    console.log(`Changes:`);
    Update.changes.forEach(Change => {
        console.log(`- ${Change}`);
    })
    LineBreak()
}

function VersionChecker(ResourceName, CurrentVersion) {
	CheckVersion(ResourceName, CurrentVersion);
}

VersionChecker("tk-lib", "1.0.1");

module.exports = {
	VersionChecker,
};
