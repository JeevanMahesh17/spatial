const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'spatial_db',
  user: 'postgres',
  password: 'ushamahesh'
});

module.exports = db;


// // const { Pool } = require('pg');

// // const pool = new Pool({
// //   user: 'postgres',
// //   host: 'localhost',
// //   database: 'spatial_db',
// //   password: 'ushamahesh',
// //   port: 5432, // Default PostgreSQL port
// // });

// // // Optional: Log when the pool connects to the database
// // pool.on('connect', () => {
// //   console.log('Connected to the database');
// // });

// // // Handle errors gracefully
// // pool.on('error', (err) => {
// //   console.error('Unexpected error on idle client', err);
// //   process.exit(-1);
// // });

// // module.exports = pool;
