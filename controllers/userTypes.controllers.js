const Model = require("../models/userType.model.js");
const UserTypes = Model.UserTypes;

const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");

exports.createUserType = async (req, res) => {
    try {
        let userType = await UserTypes.findOne({
            where: {
                type: req.body.type
            },
        })

        if (userType) {
            return res.status(400).send(req.body.type + " already exist!!!!");
        } else {
            userType = await UserTypes.create({
                type: req.body.type
            })

            return res.json({ message: "User type was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
