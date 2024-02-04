/**
 * A module that provides a prop handler.
 * @module Props
 */

const Props = {};

let PropStorage = new Map();

class Prop {
    constructor(Handle, ModelReference, ModelName, Coords, Options) {
        this.Handle = Handle;

        this.ModelReference = ModelReference;
        this.ModelName = ModelName;
        this.Coords = Coords;
        this.Options = Options;
    }
}

class CoordinateSet {
    constructor(data) {
        this.x = data.x || data.X;
        this.y = data.y || data.Y;
        this.z = data.z || data.Z;
        this.w = data.w || data.W;
    }
}

Props.DeleteProp = async (ModelReference) => {
    if (!PropStorage.has(ModelReference)) return false;
    let prop = PropStorage.get(ModelReference);
    SetEntityAsMissionEntity(prop.Handle, true, true);
    DeleteObject(prop.Handle);
    SetEntityAsNoLongerNeeded(prop.Handle);
    PropStorage.delete(ModelReference);
    return true;
}

Props.CreateProp = async (ModelReference, ModelName, Coords, Options) => {
    const CoordSet = new CoordinateSet(Coords);
	const ModelHash = GetHashKey(ModelName);

    // Prevent Overwriting

	if (PropStorage.has(ModelReference) && !Options.ReplaceModel) return false;

    // Object Loading

    // TODO: Add in timeout here

	if (!HasModelLoaded(ModelHash)) {
		RequestModel(ModelHash);
		while (!HasModelLoaded(ModelHash)) {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}
	}

    // Removing Old Objects

	if (Options.RemovePropsInRange) {
		let Range = Options.Range || 0.85;
		for (let i = 0; i < Options.RemovePropsInRange.length; i++) {
			let ObjectToRemove = GetClosestObjectOfType(
				CoordSet.x,
				CoordSet.y,
				CoordSet.z,
				Range,
				GetHashKey(Options.RemovePropsInRange[i]),
				false,
				false,
				false
			);
            if (ObjectToRemove) {
                SetEntityAsMissionEntity(ObjectToRemove, true, true);
                DeleteObject(ObjectToRemove);
                SetEntityAsNoLongerNeeded(ObjectToRemove);
            }
		}
	}

    // Object Creation

	const ObjectHandle = CreateObject(ModelHash, CoordSet.x, CoordSet.y, CoordSet.z, false, true, false);
    PropStorage.set(ModelReference, new Prop(ObjectHandle, ModelReference, ModelName, CoordSet, Options));

    // Object Attributes + Options

	if (CoordSet.w) SetEntityRotation(ObjectHandle, 0, 0, CoordSet.w, 0, 0);
	if (Options.PlaceObjectOnGround) PlaceObjectOnGroundProperly(ObjectHandle);
	if (Options.FreezeObject) FreezeEntityPosition(ObjectHandle, true);
	if (Options.MissionEntity) SetEntityAsMissionEntity(ObjectHandle);

    // Cleanup

	SetModelAsNoLongerNeeded(ModelHash);

	return ObjectHandle;
};

Props.UpdatePropModel = async (ModelReference, NewModel) => {
    if (!PropStorage.has(ModelReference)) return false;

    let prop = PropStorage.get(ModelReference);

    let Options = prop.Options;
    Options.ReplaceModel = true;
    Options.RemovePropsInRange = [prop.ModelName];

    await Props.CreateProp(ModelReference, NewModel, prop.Coords, prop.Options);

    return true;
}

Props.FaceProp = (ModelReference) => {
    if (!PropStorage.has(ModelReference)) return false;
    let prop = PropStorage.get(ModelReference);
    TaskTurnPedToFaceEntity(PlayerPedId(), prop.Handle, 800)
}

Props.HighlightProp = (ModelReference, R, G, B) => {
    if (!PropStorage.has(ModelReference)) return false;
    let prop = PropStorage.get(ModelReference);
    SetEntityDrawOutline(prop.Handle, true);
    SetEntityDrawOutlineColor(R, G, B, 100);
    SetEntityDrawOutlineShader(1);
}

Props.UnhighlightProp = (ModelReference) => {
    if (!PropStorage.has(ModelReference)) return false;
    let prop = PropStorage.get(ModelReference);
    SetEntityDrawOutline(prop.Handle, false);
}

Props.GetProp = (ModelReference) => {
    if (!PropStorage.has(ModelReference)) return null;
    let prop = PropStorage.get(ModelReference);
    return prop;
}

Props.GetPropHandle = (ModelReference) => {
    if (!PropStorage.has(ModelReference)) return null;
    let prop = PropStorage.get(ModelReference);
    return prop.Handle;
}

Props.DeleteAllProps = async () => {
    PropStorage.forEach(async (value) => {
        await Props.DeleteProp(value.ModelReference);
    })
    return true;
}

Props.DoesPropExist = (ModelReference) => {
    return PropStorage.has(ModelReference);
}

RegisterCommand("ClearTKProps", async () => {
	await Props.DeleteAllProps()
})

function GetLib_Props() {
	return Props;
}

exports("GetLib_Props", GetLib_Props);

console.log("Loaded GetLib_Props");
