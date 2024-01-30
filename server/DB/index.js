/**
 * Module for interacting with the database.
 * @module db/index
 */

const { Config } = require('../Config');
const { InternalLogger } = require('../Logger');
const { oxmysql } = require('@overextended/oxmysql');

/**
 * Executes a database query.
 * @async
 * @param {string} Query - The SQL query to execute.
 * @param {Array} [Params] - The parameters to be used in the query.
 * @returns {Promise<Array>} - The result of the query.
 */
async function run(Query, Params) {
	try {
		if (!Query) throw new Error('No Query Provided');
		if (Params) return await oxmysql.query(Query, Params);
		return await oxmysql.query(Query);
	} catch (error) {
		InternalLogger.error(error);
		return null;
	}
};

/**
 * Retrieves a single row from the database.
 * @async
 * @param {string} Query - The SQL query to execute.
 * @param {Array} [Params] - The parameters to be used in the query.
 * @returns {Promise<Object|null>} - The first row of the query result, or null if no rows are found.
 */
async function get(Query, Params) {
	try {
		if (!Query) throw new Error('No Query Provided');
		if (Params) {
			let r = await oxmysql.query(Query, Params);
			if (r.length > 0) return r[0];
			return null;
		} else {
			let p = await oxmysql.query(Query);
			if (p.length > 0) return p[0];
			return null;
		}
	} catch (error) {
		InternalLogger.error(error);
		return null;
	}
};

/**
 * Retrieves all rows from the database.
 * @async
 * @param {string} Query - The SQL query to execute.
 * @param {Array} [Params] - The parameters to be used in the query.
 * @returns {Promise<Array>} - The result of the query.
 */
async function all(Query, Params) {
	try {
		if (!Query) throw new Error('No Query Provided');
		if (Params) return await oxmysql.query(Query, Params);
		return await oxmysql.query(Query);
	} catch (error) {
		InternalLogger.error(error);
		return null;
	}
};

const DB = {};

DB.Run = async (Query, Params) => {
	InternalLogger.debug("Executing DB Run Query", Query);
	return await run(Query, Params);
}

DB.Get = async (Query, Params) => {
	InternalLogger.debug("Executing DB Get Query", Query);
	return await get(Query, Params);
}

DB.All = async (Query, Params) => {
	InternalLogger.debug("Executing DB All Query", Query);
	return await all(Query, Params);
}

module.exports = { DB };