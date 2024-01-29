const { Config } = require("../Config");
const { InternalLogger } = require("../Logger");

/**
 * Retrieves the 2D vector of a player.
 *
 * @param {number} src - The source of the player.
 * @returns {Vector2} - The player's position as a Vector2.
 */
function GetPlayerVector2(src) {
    const ped = GetPlayerPed(src);
    const [X, Y, Z] = GetEntityCoords(ped);
    return {
        x: X,
        y: Y,
    };
}

/**
 * Retrieves the 3D vector of a player.
 *
 * @param {number} src - The source of the player.
 * @returns {Vector3} - The player's position as a Vector3.
 */
function GetPlayerVector3(src) {
    const ped = GetPlayerPed(src);
    const [X, Y, Z] = GetEntityCoords(ped);
    return {
        x: X,
        y: Y,
        z: Z,
    };
}

/**
 * Retrieves the position and heading of a player as a Vector4.
 * 
 * @param {number} src - The player source identifier.
 * @returns {Vector4} The player's position and heading as a Vector4.
 */
function GetPlayerVector4(src) {
    const ped = GetPlayerPed(src);
    const [X, Y, Z] = GetEntityCoords(ped);
    const W = GetEntityHeading(ped);
    return {
        x: X,
        y: Y,
        z: Z,
        w: W,
    };
}

module.exports = {
    GetPlayerVector2,
    GetPlayerVector3,
    GetPlayerVector4,
};
