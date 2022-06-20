const Model = require("../models/offer.model.js");
const Offer = Model.Offers;

const { Op } = require("sequelize");


exports.createOffer = async (req, res) => {
    try {
        let offer = await Offer.findOne({
            where: {
                title: req.body.title
            },
        })

        if (offer) {
            return res.status(400).send(req.body.title + " already exist!!!!");
        } else {
            offer = await Offer.create({
                title: req.body.title,
                description: req.body.description,
                localization: req.body.localization,
                startDate: new Date(req.body.startDate),
                duration: req.body.duration,
                price: req.body.price,
                id_offerType: req.body.id_offerType,
                id_user: req.loggedUserId
            })

            return res.json({ message: "Offer was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}