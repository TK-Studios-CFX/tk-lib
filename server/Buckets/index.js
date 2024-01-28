const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');

const DefaultRoutingBucket = 0;
let RoutingBuckets = new Map();
let EntityLockdownModes = [
    "strict", // No entities can be created by clients at all.
    "relaxed", // Only script-owned entities created by clients are blocked.
    "inactive", // Clients can create any entity they want.
]

const Buckets = {};

/**
 * Represents a routing bucket.
 * 
 * @class
 * @constructor
 * @param {string} ID - The ID of the routing bucket.
 * @param {boolean} [PopulationEnabled=true] - Indicates whether the population is enabled for the routing bucket.
 * @param {string} [EntityLockdownMode="inactive"] - The lockdown mode for the entities in the routing bucket.
 *
 * Represents a routing bucket.
 * @class
 */
class RoutingBucket {
    constructor(ID, PopulationEnabled, EntityLockdownMode) {
        this.ID = ID;
        this.PopulationEnabled = PopulationEnabled || false;
        this.EntityLockdownMode = EntityLockdownMode || "inactive"

        SetRoutingBucketEntityLockdownMode(this.ID, this.EntityLockdownMode);
        SetRoutingBucketPopulationEnabled(this.ID, this.PopulationEnabled);
    }
    SetLockdownMode(EntityLockdownMode) {
        this.EntityLockdownMode = EntityLockdownMode;
        return SetRoutingBucketEntityLockdownMode(this.ID, this.EntityLockdownMode);
    }
    SetPopulationEnabled(PopulationEnabled) {
        this.PopulationEnabled = PopulationEnabled;
        return SetRoutingBucketPopulationEnabled(this.ID, this.PopulationEnabled);
    }
}

/**
 * Retrieves the routing buckets.
 * 
 * @returns {Array} An array containing the routing buckets.
 */
Buckets.GetRoutingBuckets = () => {
    return Array.from(RoutingBuckets.values());
}

/**
 * Clears the player routing bucket and sets it to the default routing bucket.
 * 
 * @param {number} src - The source of the player.
 * @returns {void}
 */
Buckets.ClearPlayerRoutingBucket = (src) => {
    SetPlayerRoutingBucket(src, DefaultRoutingBucket);
    return
}

/**
 * Clears the entity routing bucket and sets it to the default routing bucket.
 * 
 * @param {number} entity - The source of the player.
 * @returns {void}
 */
Buckets.ClearPlayerRoutingBucket = (entity) => {
    SetEntityRoutingBucket(entity, DefaultRoutingBucket);
    return
}

/**
 * Creates a routing bucket with the specified parameters.
 * 
 * @param {boolean} PopulationEnabled - Indicates whether population is enabled for the routing bucket.
 * @param {string} EntityLockdownMode - The entity lockdown mode for the routing bucket. ['strict', 'relaxed', 'inactive']
 * @returns {number} The ID of the created routing bucket.
 */
Buckets.CreateRoutingBucket = (PopulationEnabled, EntityLockdownMode) => {
    if (EntityLockdownMode && !EntityLockdownModes.includes(EntityLockdownMode)) return InternalLogger.error(`Invalid EntityLockdownMode '${EntityLockdownMode}'`)
    let ID = GetLowestUnusedRoutingBucket();
    RoutingBuckets.set(ID, new RoutingBucket(ID, PopulationEnabled, EntityLockdownMode))
    return ID;
}

/**
 * Retrieves the routing bucket with the specified ID.
 * 
 * @param {string} ID - The ID of the routing bucket.
 * @returns {object|null} - The routing bucket object if found, or null if not found.
 */
Buckets.GetRoutingBucket = (ID) => {
    return RoutingBuckets.has(ID) ? RoutingBuckets.get(ID) : null;
}

/**
 * Deletes the routing bucket with the specified ID.
 * Returns all players and entities created inside the bucket to the default routing bucket.
 * 
 * @param {string} ID - The ID of the routing bucket.
 * @returns {void} - The routing bucket object if found, or null if not found.
 */
Buckets.DeleteRoutingBucket = (ID) => {
    if (!RoutingBuckets.has(ID)) return false;
    let Bucket = RoutingBuckets.get(ID);
    RoutingBuckets.delete(ID);
    return
}

/**
 * Sets a player's routing bucket.
 * 
 * @param {number} src - The player source.
 * @param {string} BucketID - The ID of the routing bucket.
 */
Buckets.SetPlayerBucket = (src, BucketID) => {
    let Bucket = RoutingBuckets.get(BucketID);
    if (!Bucket) RoutingBuckets.set(ID, new RoutingBucket(ID, true))
    SetPlayerRoutingBucket(src, BucketID);
    return
}

/**
 * Sets an entities routing bucket.
 * 
 * @param {number} entity - The entity handle.
 * @param {string} BucketID - The ID of the routing bucket.
 */
Buckets.SetEntityBucket = (entity, BucketID) => {
    let Bucket = RoutingBuckets.get(BucketID);
    if (!Bucket) RoutingBuckets.set(ID, new RoutingBucket(ID, true))
    SetPlayerRoutingBucket(entity, BucketID);
    return
}

/**
 * Returns the lowest unused routing bucket.
 * 
 * @returns {number} The lowest unused routing bucket.
 */
function GetLowestUnusedRoutingBucket() {
    let lowestInteger = 10;
    while (RoutingBuckets.has(lowestInteger)) {
        lowestInteger++;
    }
    return lowestInteger;
}

module.exports = {
    Buckets,
};