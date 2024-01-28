const Lib = {};

const { Config } = require("./server/config");
Lib.Config = Config;

Lib.Functions = {};

const { Logger } = require("./server/Logger");
Lib.Functions.Logger = Logger;

const { Notify } = require("./server/Notify");
Lib.Functions.Notify = Notify;

const { AddItem } = require("./server/AddItem");
Lib.Functions.AddItem = AddItem;

const { RemoveItem } = require("./server/RemoveItem");
Lib.Functions.RemoveItem = RemoveItem; 

const { VersionChecker } = require("./server/VersionChecker");
Lib.Functions.VersionChecker = VersionChecker;

function GetLib() {
	return Lib;
}

exports("GetLib", GetLib);

Logger("TK-Lib", "Main").log("Booted TK-Lib");
