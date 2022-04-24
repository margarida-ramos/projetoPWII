const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Reservations extends Model { }

Reservations.init({
    confirm: DataTypes.BOOLEAN
}, { sequelize, timestamps: false, modelName: 'reservation' })


sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Reservations = Reservations;