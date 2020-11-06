const { Sequelize } = require("sequelize");

var accessEnv = require("../helpers/accessEnv");

const dbURI = accessEnv.accessEnv("DB_URI");

const sequelize = new Sequelize(dbURI, {
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true
  },
  logging: false
});

module.exports = sequelize;