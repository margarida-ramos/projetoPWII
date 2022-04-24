const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/db_config.js');
const { Accommodations } = require('./accommodation.model.js');
const { Classifications } = require('./classification.model.js');
const { Comments } = require('./comment.model.js');
const { Likes } = require('./like.model.js');
const { Offers } = require('./offer.model.js');
const { Reservations } = require('./reservation.model.js');
const sequelize = new Sequelize.Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: 'mysql'
})

class Users extends Model { }

Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, timestamps: false, modelName: 'user' })

Users.hasMany(Comments, { foreignKey: 'id_user' })
Comments.belongsTo(Users, { foreignKey: 'id_user' })

Users.hasMany(Likes, { foreignKey: 'id_user' })
Likes.belongsTo(Users, { foreignKey: 'id_user' })

Users.hasMany(Classifications, { foreignKey: 'id_user' })
Classifications.belongsTo(Users, { foreignKey: 'id_user' })

Users.hasMany(Offers, { foreignKey: 'id_user' })
Offers.belongsTo(Users, { foreignKey: 'id_user' })

Users.hasMany(Accommodations, { foreignKey: 'id_user' })
Accommodations.belongsTo(Users, { foreignKey: 'id_user' })

Users.hasMany(Reservations, { foreignKey: 'id_user' })
Reservations.belongsTo(Users, { foreignKey: 'id_user' })


sequelize.sync().then().catch(error => {
    console.log(error);
})

exports.Users = Users;