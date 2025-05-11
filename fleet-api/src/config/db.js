const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: process.env.DB_MAX || 20,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS || 30000,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT_MILLIS || 2000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
