const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'spatial_db',
  user: 'username',
  password: 'ushamahesh'
});

module.exports = db;
