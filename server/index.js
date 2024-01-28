const lib = {};

lib.Functions = {};

const { Logger } = require("./server/Logger");
lib.Functions.Logger = Logger;

const { Notify } = require("./server/Notify");
lib.Functions.Notify = Notify;

const { AddItem } = require("./server/AddItem");
lib.Functions.AddItem = AddItem;

const { RemoveItem } = require("./server/RemoveItem");
lib.Functions.RemoveItem = RemoveItem; 

const { VersionChecker } = require("./server/VersionChecker");
lib.Functions.VersionChecker = VersionChecker;

const { Config } = require("./server/config");
lib.Config = Config;

function GetLib() {
	return lib;
}

exports("GetLib", GetLib);

Logger("TK-Lib", "Main").log("Booted TK-Lib");
