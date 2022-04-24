const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const { Accommodations } = require('./accommodation.model.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class RoomTypes extends Model { }

RoomTypes.init({
    type: DataTypes.STRING
}, { sequelize, timestamps: false, modelName: 'roomType' })

RoomTypes.hasMany(Accommodations, { foreignKey: 'id_roomType' })
Accommodations.belongsTo(RoomTypes, { foreignKey: 'id_roomType' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.RoomTypes = RoomTypes;