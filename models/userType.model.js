const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const { Users } = require('./user.model.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})


class UserTypes extends Model { }

UserTypes.init({
    type: DataTypes.STRING
}, { sequelize, timestamps: false, modelName: 'userType' })

UserTypes.hasMany(Users, { foreignKey: 'id_userType' })
Users.belongsTo(UserTypes, { foreignKey: 'id_userType' })

sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.UserTypes = UserTypes;