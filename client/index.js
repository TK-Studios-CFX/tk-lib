let QBCore = global.exports["qb-core"].GetCoreObject();

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

Lib.Functions.ProgressBar = async (Label, Duration, Options) => {
	return new Promise((resolve, reject) => {
		QBCore.Functions.Progressbar(
			"tk_lib_progressbar",
			Label, // Text
			Duration, // Duration
			Options.UseWhileDead || false, // Use While Dead
			true, // Can Cancel
			{
				disableMovement: true,
				disableCarMovement: true,
				disableMouse: false,
				disableCombat: true,
			},
			{
				animDict: Options.animDict,
				anim: Options.anim,
				flags: 49,
			},
			{},
			{},
			function () {
				return resolve(true);
			},
			function () {
				return resolve(false);
			}
		);
	});
}

Lib.Functions.Logger = global.exports['tk-lib'].GetLib_Logger();

Lib.Maths = global.exports['tk-lib'].GetLib_Maths();

Lib.Props = global.exports['tk-lib'].GetLib_Props();

Lib.Functions.ObjectPlacementUI = global.exports['tk-lib'].ObjectPlacementUI;

// RegisterCommand("TestProps", async () => {
// 	console.log("Going")
// 	let [x, y, z] = GetEntityCoords(PlayerPedId());
// 	let [_a, _b, w] = GetEntityRotation(PlayerPedId());

// 	let Coords = await Lib.Functions.ObjectPlacementUI("nuk3_prop_server_empty");

// 	if (!Coords) return console.error("NO COORDS");

// 	await Lib.Props.CreateProp('TestObject', 'nuk3_prop_server_empty', Coords, {
// 		FreezeObject: true,
// 		PlaceObjectOnGround: true,
// 		FreezeObject: true,
// 		MissionEntity: true,
// 	});

// 	for (let i = 0; i <= 11; i++) {
// 		await Lib.Props.UpdatePropModel('TestObject', `nuk3_prop_server_${i}`);
// 		await Lib.Functions.Wait(200);
// 	}
	
// 	await Lib.Props.DeleteProp('TestObject')
// })

let TestProps = []
let PropCounter = 0;
RegisterCommand("TestProp", async (source, args, rawcommand) => {
	if (!args[0]) return;
	let Coords = await Lib.Functions.ObjectPlacementUI(args[0]);
	if (!Coords) return;
	PropCounter = PropCounter + 1
	TestProps.push(`TestObject_${PropCounter}`);
	await Lib.Props.DeleteProp(`TestObject_${PropCounter}`);
	await Lib.Props.CreateProp(`TestObject_${PropCounter}`, args[0], Coords, {
		FreezeObject: true,
		PlaceObjectOnGround: true,
		FreezeObject: true,
		MissionEntity: true,
		IsNetworkProp: true,
	});
})

RegisterCommand("DelTestProps", async (source, args, rawcommand) => {
	TestProps.forEach(async (Prop) => {
		await Lib.Props.DeleteProp(Prop);
	})
})

function GetLib() {
	return Lib;
}

exports("GetLib", GetLib);