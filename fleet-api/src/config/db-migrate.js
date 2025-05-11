require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const config = JSON.stringify({
  "driver": "pg",
  "user": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "host": process.env.DB_HOST,
  "database": process.env.DB_DATABASE,
  "port": process.env.DB_PORT || 5432
});

module.exports = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
