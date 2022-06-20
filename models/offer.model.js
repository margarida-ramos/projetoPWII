const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js')
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})
const { OfferComments } = require('./offerComment.model.js');

class Offers extends Model { }

Offers.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    localization: DataTypes.STRING,
    startDate: DataTypes.DATE,
    duration: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
}, { sequelize, timestamps: false, modelName: 'offer' })

Offers.hasMany(OfferComments, { foreignKey: 'id_offer' })
OfferComments.belongsTo(Offers, { foreignKey: 'id_offer' })


sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Offers = Offers;