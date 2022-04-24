const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js')
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Offers extends Model { }

Offers.init({
    type: DataTypes.INTEGER,
    localization: DataTypes.STRING,
    startDate: DataTypes.DATE,
    duration: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
}, { sequelize, timestamps: false, modelName: 'offer' })


sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Offers = Offers;