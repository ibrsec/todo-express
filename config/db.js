const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    "sqlite:" + (process.env.CONNECTION_STRING || "./db/sqlite3"),
)

module.exports = sequelize;