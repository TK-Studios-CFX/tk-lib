const { Config } = require('../Config');

const Time = {};

/**
 * Represents the number of milliseconds in a second.
 * @type {number}
 */
Time.Second = 1000;

/**
 * Represents the number of milliseconds in a minute.
 * @type {number}
 */
Time.Minute = 1000 * 60;

/**
 * Represents the number of milliseconds in an hour.
 * @type {number}
 */
Time.Hour = 1000 * 60 * 60;

/**
 * Represents the number of milliseconds in a day.
 * @type {number}
 */
Time.Day = 1000 * 60 * 60 * 24;

/**
 * Represents the number of milliseconds in a week.
 * @type {number}
 */
Time.Week = 1000 * 60 * 60 * 24 * 7;

/**
 * Represents the number of milliseconds in a month.
 * @type {number}
 */
Time.Month = 1000 * 60 * 60 * 24 * 30;

/**
 * Represents the number of milliseconds in a year.
 * @type {number}
 */
Time.Year = 1000 * 60 * 60 * 24 * 365;

/**
 * Get the current epoch time in milliseconds.
 * 
 * @returns {number} The current epoch time in milliseconds.
 */
Time.GetEpoch = () => {
    return Date.now();
}

/**
 * Convert epoch time to a readable date string.
 * 
 * @param {number} epochTime - The epoch time to convert.
 * @returns {string} The formatted date string.
 */
Time.EpochToReadableDateString = (epochTime) => {
    const date = new Date(epochTime);
    return date.toDateString();
}

/**
 * Convert epoch time to a readable date and time string.
 * 
 * @param {number} epochTime - The epoch time to convert.
 * @returns {string} The formatted date and time string.
 */
Time.EpochToReadableDateTimeString = (epochTime) => {
    const date = new Date(epochTime);
    return date.toLocaleString();
}

/**
 * Convert epoch time to a short date string.
 * 
 * @param {number} epochTime - The epoch time to convert.
 * @returns {string} The formatted short date string.
 */
Time.EpochToShortDateString = (epochTime) => {
    const date = new Date(epochTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
}

/**
 * Convert milliseconds to a readable time format.
 * 
 * @param {number} milliseconds - The number of milliseconds to convert.
 * @returns {string} The formatted time string.
 */
Time.MSToReadableTimeString = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000 % 60);
    const minutes = Math.floor(milliseconds / 60000 % 60);
    const hours = Math.floor(milliseconds / 3600000);

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    return parts.join(' ');
}

module.exports = { Time };