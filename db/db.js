const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student",
  password: "AmarinPhason4",
  port: 5432,
});

module.exports = pool;
