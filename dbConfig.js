require("dotenv").config();
const { Client } = require("pg");

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const client = new Client({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : connectionString,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
client.connect();
module.exports = { client };
