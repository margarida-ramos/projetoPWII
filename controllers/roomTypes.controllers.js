const Model = require("../models/roomType.model.js");
const RoomType = Model.RoomTypes;

const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");

exports.createRoomType = async (req, res) => {
    try {
        let roomType = await RoomType.findOne({
            where: {
                type: req.body.type
            },
        })

        if (roomType) {
            return res.status(400).send(req.body.type + " already exist!!!!");
        } else {
            roomType = await RoomType.create({
                type: req.body.type
            })

            return res.json({ message: "Room type was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllRoomTypes = (req, res) => {
    RoomType.findAll()
        .then((list) => {
            res.status(200).json(list);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("Bad request!");
        });
}