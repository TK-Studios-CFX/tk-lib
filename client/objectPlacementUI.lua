local PlacingObject = false
local CurrentModel, CurrentObject, CurrentCoords = nil, nil, nil

local function ButtonMessage(text)
    BeginTextCommandScaleformString("STRING")
    AddTextComponentScaleform(text)
    EndTextCommandScaleformString()
end

local function Button(ControlButton)
    N_0xe83a3e3557a56640(ControlButton)
end

local function setupScaleform(scaleform)
    local scaleform = RequestScaleformMovie(scaleform)
    while not HasScaleformMovieLoaded(scaleform) do
        Citizen.Wait(0)
    end

    -- draw it once to set up layout
    DrawScaleformMovieFullscreen(scaleform, 255, 255, 255, 0, 0)

    PushScaleformMovieFunction(scaleform, "CLEAR_ALL")
    PopScaleformMovieFunctionVoid()
    
    PushScaleformMovieFunction(scaleform, "SET_CLEAR_SPACE")
    PushScaleformMovieFunctionParameterInt(200)
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
    PushScaleformMovieFunctionParameterInt(0)
    Button(GetControlInstructionalButton(2, 152, true))
    ButtonMessage("Cancel")
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
    PushScaleformMovieFunctionParameterInt(1)
    Button(GetControlInstructionalButton(2, 153, true))
    ButtonMessage("Place object")
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
    PushScaleformMovieFunctionParameterInt(2)
    Button(GetControlInstructionalButton(2, 190, true))
    Button(GetControlInstructionalButton(2, 189, true))
    ButtonMessage("Rotate object")
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, "DRAW_INSTRUCTIONAL_BUTTONS")
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, "SET_BACKGROUND_COLOUR")
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(80)
    PopScaleformMovieFunctionVoid()

    return scaleform
end

local function RequestSpawnObject(object)
    local hash = GetHashKey(object)
    RequestModel(hash)
    while not HasModelLoaded(hash) do 
        Wait(1000)
    end
end

local function RotationToDirection(rotation)
	local adjustedRotation =
	{
		x = (math.pi / 180) * rotation.x,
		y = (math.pi / 180) * rotation.y,
		z = (math.pi / 180) * rotation.z
	}
	local direction =
	{
		x = -math.sin(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
		y = math.cos(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
		z = math.sin(adjustedRotation.x)
	}
	return direction
end

local function RayCastGamePlayCamera(distance)
    local cameraRotation = GetGameplayCamRot()
	local cameraCoord = GetGameplayCamCoord()
	local direction = RotationToDirection(cameraRotation)
	local destination =
	{
		x = cameraCoord.x + direction.x * distance,
		y = cameraCoord.y + direction.y * distance,
		z = cameraCoord.z + direction.z * distance
	}
	local a, b, c, d, e = GetShapeTestResult(StartShapeTestSweptSphere(cameraCoord.x, cameraCoord.y, cameraCoord.z, destination.x, destination.y, destination.z, 0.2, 339, PlayerPedId(), 4))
	return b, c, e
end

local function ObjectPlacementUI(object)
    CurrentObject = nil
    CurrentCoords = nil
    CurrentModel = nil
    PlacingObject = true;
    RequestSpawnObject(object)
    CurrentModel = object
    CurrentObject = CreateObject(object, 1.0, 1.0, 1.0, false, true, false)
    local heading = 0.0
    SetEntityHeading(CurrentObject, 0)
    -- SetEntityAlpha(CurrentObject, 200)
    SetEntityCollision(CurrentObject, false, false)
    FreezeEntityPosition(CurrentObject, true)

    SetEntityDrawOutline(CurrentObject, true);
    SetEntityDrawOutlineColor(52, 134, 235, 255);
    SetEntityDrawOutlineShader(0);

    local IsPlacementValid = false

    form = setupScaleform("instructional_buttons")
    while PlacingObject do
        local hit, coords, entity = RayCastGamePlayCamera(20.0)
        
        DrawScaleformMovieFullscreen(form, 255, 255, 255, 255, 0)

        if hit then
            IsPlacementValid = true
            CurrentCoords = coords
            SetEntityCoords(CurrentObject, coords.x, coords.y, coords.z)
        else
            IsPlacementValid = false
        end
        
        if IsControlPressed(0, 174) then
            heading = heading + 2
            if heading > 360 then heading = 0.0 end
        end

        if IsControlPressed(0, 175) then
            heading = heading - 2
            if heading < 0 then heading = 360.0 end
        end

        SetEntityHeading(CurrentObject, heading)
        if IsControlJustPressed(0, 44) then
            CurrentCoords = nil
            PlacingObject = false
        end

        SetEntityHeading(CurrentObject, heading)
        if IsControlJustPressed(0, 38) then
            PlacingObject = false
        end
        
        Wait(1)
    end

    DeleteObject(CurrentObject)
    
    if not CurrentCoords then return false end
    if CurrentCoords.z == 0 then return false end
    if not IsPlacementValid then return false end

    return {
        x = CurrentCoords.x,
        y = CurrentCoords.y,
        z = CurrentCoords.z,
        w = heading,
    }

end

exports("ObjectPlacementUI", ObjectPlacementUI)