const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class Comments extends Model { }

Comments.init({
    comment: DataTypes.STRING
}, { sequelize, timestamps: false, modelName: 'comment' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Comments = Comments;