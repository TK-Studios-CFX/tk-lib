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

Lib.Props = global.exports['tk-lib'].GetLib_Props();

RegisterCommand("TestProps", async () => {
	let [x, y, z] = GetEntityCoords(PlayerPedId());
	let [_a, _b, w] = GetEntityRotation(PlayerPedId());

	// let Coords = {
	// 	x: -1776.11, 
	// 	y: -2774.2, 
	// 	z: 13.94, 
	// 	w: 109.97
	// }

	let Coords = {
		x: x,
		y: y,
		z: z,
		w: w,
	}

	await Lib.Props.CreateProp('TestObject', 'nuk3_prop_server_empty', Coords, {
		FreezeObject: true,
		PlaceObjectOnGround: true,
		FreezeObject: true,
		MissionEntity: true,
	});

	for (let i = 0; i <= 11; i++) {
		await Lib.Props.UpdatePropModel('TestObject', `nuk3_prop_server_${i}`);
		await Lib.Functions.Wait(200);
	}
	
	await Lib.Props.DeleteProp('TestObject')
})

function GetLib() {
	return Lib;
}

exports("GetLib", GetLib);