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
module.exports.run = async (Query, Params) => {
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
module.exports.get = async (Query, Params) => {
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
module.exports.all = async (Query, Params) => {
	try {
		if (!Query) throw new Error('No Query Provided');
		if (Params) return await oxmysql.query(Query, Params);
		return await oxmysql.query(Query);
	} catch (error) {
		InternalLogger.error(error);
		return null;
	}
};
