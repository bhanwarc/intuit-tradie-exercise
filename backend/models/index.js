const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "staging";
const config = require("../config/config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// register models
/* eslint-disable global-require */
const db = {
  Bid: require("./Bid")(sequelize, Sequelize.DataTypes),
  Talent: require("./Talent")(sequelize, Sequelize.DataTypes),
  Client: require("./Client")(sequelize, Sequelize.DataTypes),
  Job: require("./Job")(sequelize, Sequelize.DataTypes),
};
/* eslint-enable global-require */

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
