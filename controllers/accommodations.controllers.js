const Model = require("../models/accommodation.model.js");
const Accommodations = Model.Accommodations;

const { Op } = require("sequelize");


exports.createAccommodation = async (req, res) => {
    try {
        let accommodation = await Accommodations.findOne({
            where: {
                title: req.body.title
            },
        })

        if (accommodation) {
            return res.status(400).send(req.body.type + " already exist!!!!");
        } else {
            accommodation = await Accommodations.create({
                title: req.body.title,
                localization: req.body.localization,
                price: req.body.price,
                personsTotal: req.body.personsTotal,
                id_roomType: req.body.id_roomType,
                id_user: req.loggedUserId,
                published: false
            })

            return res.json({ message: "Accommodation was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAll = async (req, res) => {
    let { localization, personsTotal } = req.query;
    let condition = null

    if (localization) {
        if (condition == null) {
            condition = {
                localization: { [Op.like]: `%${localization}%` }
            }
        } else {
            condition['localization'] = { [Op.like]: `%${localization}%` };
        }
    }

    if (personsTotal) {
        if (condition == null) {

            console.log(personsTotal)
            condition = {
                personsTotal: { [Op.gte]: `%${personsTotal}%` }
            }
        } else {
            condition['personsTotal'] =
                { [Op.gte]: personsTotal };
        }
    }

    try {

        const accommodations = await Accommodations.findAndCountAll({
            where: condition
        });

        if (accommodations) {
            return res.status(200).json(accommodations);
        } else {
            return res.status(404).json({ error: "No Accommodations left" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
}