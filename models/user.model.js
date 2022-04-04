const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js')
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Customers extends Model { }

Customers.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
}, { sequelize, timestamps: false, modelName: 'customer' })


sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Customers = Customers;