const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const { Classifications } = require('./classification.model.js');
const { AccommodationComments } = require('./accommodationComment.model.js');
const { Likes } = require('./like.model.js');
const { Reservations } = require('./reservation.model.js');

const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Accommodations extends Model { }

Accommodations.init({
    title: DataTypes.STRING,
    localization: DataTypes.STRING,
    personsTotal: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    published: DataTypes.BOOLEAN
}, { sequelize, timestamps: false, modelName: 'accommodations' })


Accommodations.hasMany(Classifications, { foreignKey: 'id_accommodation' })
Classifications.belongsTo(Accommodations, { foreignKey: 'id_accommodation' })

Accommodations.hasMany(Likes, { foreignKey: 'id_accommodation' })
Likes.belongsTo(Accommodations, { foreignKey: 'id_accommodation' })

Accommodations.hasMany(Reservations, { foreignKey: 'id_accommodation' })
Reservations.belongsTo(Accommodations, { foreignKey: 'id_accommodation' })

Accommodations.hasMany(AccommodationComments, { foreignKey: 'id_accommodation' })
AccommodationComments.belongsTo(Accommodations, { foreignKey: 'id_accommodation' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Accommodations = Accommodations;