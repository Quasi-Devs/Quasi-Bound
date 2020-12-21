require('dotenv').config();
const pg = require('pg');

const db = new pg.Client({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DB}`,
});

db.connect()
  .then(() => {
    console.info('Database successfully connected!');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
