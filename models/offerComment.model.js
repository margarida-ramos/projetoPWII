const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class OfferComments extends Model { }

OfferComments.init({
    title: DataTypes.STRING,
    comment: DataTypes.STRING
}, { sequelize, timestamps: false, modelName: 'offerComment' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.OfferComments = OfferComments;