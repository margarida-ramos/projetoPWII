const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Likes extends Model { }

Likes.init({
}, { sequelize, timestamps: false, modelName: 'like' })


sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Likes = Likes;