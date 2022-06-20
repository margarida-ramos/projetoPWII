const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require('../config/auth.config.js');

const Model = require("../models/user.model.js");
const UserTypesModel = require("../models/userType.model.js");

const UserTypes = UserTypesModel.UserTypes
const Users = Model.Users;

exports.signup = async (req, res) => {
    try {
        let user = await Users.findOne({
            where: {
                email: req.body.email
            },
        })

        if (user) {
            return res.status(400).send(req.body.email + " already exist!!!!");
        } else {
            user = await Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 6),
                id_userType: req.body.id_userType
            })

            return res.json({ message: "User was registered successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.signin = async (req, res) => {
    try {
        let user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password
        );
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null, message: "Invalid password!"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 1728000 }); //expira em 20 dias

        let userType = await UserTypes.findByPk(user.id_userType)

        return res.status(200).json({
            id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, userType: userType.type, accessToken: token
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token.replace('Bearer ', ''), config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.loggedUserId = decoded.id;
        next();

    })

}

exports.isAdmin = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserId);
    let userType = await user.getUserType();
    req.loggedUserType = userType.type;
    if (userType.type !== 'admin') {
        return res.status(403).send({ message: "You must be admin to perform this request!" })
    }
    next();
};

exports.isServiceProvider = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserId);
    let userType = await user.getUserType();
    req.loggedUserType = userType.type;
    console.log('userType', userType);
    if (userType.type !== 'service provider') {
        return res.status(403).send({ message: "You must be service provider to perform this request!" })
    }
    next();
};

exports.isSpOrAdmin = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserId);
    let userType = await user.getUserType();
    req.loggedUserType = userType.type;
    if (userType.type !== 'service provider' && userType.type !== 'admin') {
        return res.status(403).send({ message: "You must be service provider to perform this request!" })
    }
    next();
};

exports.isUser = async (req, res, next) => {
    let user = await Users.findByPk(req.loggedUserId);
    let userType = await user.getUserType();
    req.loggedUserType = userType.type;
    if (userType.type !== "client") {
        return res.status(403).send({ message: "You must be a client to perform this request!" })
    }
    next();
}