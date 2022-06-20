const Model = require("../models/offerType.model.js");
const OfferType = Model.OfferType;

const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");

exports.createOfferType = async (req, res) => {
    try {
        let offerType = await OfferType.findOne({
            where: {
                type: req.body.type
            },
        })

        if (offerType) {
            return res.status(400).send(req.body.type + " already exist!!!!");
        } else {
            offerType = await OfferType.create({
                type: req.body.type
            })

            return res.json({ message: "Offer type was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllOfferTypes = (req, res) => {
    OfferType.findAll()
        .then((list) => {
            res.status(200).json(list);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("Bad request!");
        });
}