/**
 * Author: Dennis Felipe Urtubia
 * Exports a knex and MySQL db connection
 */

const knex = require('knex');
const config = require('./knexfile');

const developmentConfig = config.development;

const connection = knex(developmentConfig);

module.exports = connection;