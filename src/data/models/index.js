const env = require('dotenv');
env.config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mongoose = require("mongoose");
const basename = path.basename(__filename);
const db = {};
const config = require('../../../config/config.json');

let sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    multipleStatements: true,
    dialect: "postgres",
    autoreconnect: true,
    dialectOptions: {
        connectTimeout: 60000
    },
    pool: {
        max: 1000,
        min: 0,
        acquire: 60000,
        idle: 10000,
    },
});
fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
        // console.log(db[modelName]);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;