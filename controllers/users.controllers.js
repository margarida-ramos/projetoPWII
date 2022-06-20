const Model = require("../models/user.model.js");
const Users = Model.Users;

const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");

const create = async (req, res) => {
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
                password: bcrypt.hashSync(req.body.password, 6)
            })

            return res.json({ message: "User was registered successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.create = create;