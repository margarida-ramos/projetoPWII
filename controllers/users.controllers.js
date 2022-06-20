const Model = require("../models/user.model.js");
const Users = Model.Users;

const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");

exports.updateUser = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body can not be empty!" });
        return;
    }
    if (req.loggedUserId != req.params.userID) {
        res.status(404).json({ message: "Must be logged in with the user" });
        return;
    } else {
        Users.findByPk(req.params.userID)
            .then((user) => {
                console.log(user)
                if (user === null)
                    res.status(404).json({
                        message: `Not found!`,
                    });
                else {
                    user
                        .update(req.body, { where: { id: req.params.userID } })
                        .then((result) => {
                            res.status(200).json({
                                message: `Updated successfully!`,
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error!`,
                });
            });
    }

};