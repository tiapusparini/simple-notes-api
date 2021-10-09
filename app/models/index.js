const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pengguna = require("./pengguna.model.js")(sequelize, Sequelize);
db.data = require("./data.model.js")(sequelize, Sequelize);

//MAKE RELATION
// db.pengguna.hasMany(db.data, { as: "data_notes" });
db.data.belongsTo(db.pengguna, { foreignKey: "id_pengguna" });

module.exports = db;