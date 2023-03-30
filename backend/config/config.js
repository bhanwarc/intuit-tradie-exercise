require("dotenv").config({ path: `${__dirname}/../.env.${process.env.NODE_ENV}` });
const pg = require("pg");

const DB_CONFIG = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectModule: pg,
  dialect: "postgres",
};

module.exports = {
  development: { ...DB_CONFIG },
  staging: { ...DB_CONFIG },
  production: { ...DB_CONFIG },
  qa: { ...DB_CONFIG },
  test: { ...DB_CONFIG },
};
