const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const { Accommodations } = require('./accommodation.model.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Classifications extends Model { }

Classifications.init({
    starNumber: DataTypes.INTEGER
}, { sequelize, timestamps: false, modelName: 'classification' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Classifications = Classifications;