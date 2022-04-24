const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const { Offers } = require('./offer.model.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class OfferType extends Model { }

OfferType.init({
    type: DataTypes.STRING
}, { sequelize, timestamps: false, modelName: 'offerType' })

OfferType.hasMany(Offers, { foreignKey: 'id_offerType' })
Offers.belongsTo(OfferType, { foreignKey: 'id_offerType' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.OfferType = OfferType;