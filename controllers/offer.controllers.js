const Model = require("../models/offer.model.js");
const Offer = Model.Offers;

const { Op } = require("sequelize");
const { OfferType } = require("../models/offerType.model.js");
const { Users } = require("../models/user.model.js");
const { count } = require("console");


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

exports.getAll = async (req, res) => {
    let { localization, title } = req.query;
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

    if (title) {
        if (condition == null) {
            condition = {
                title: { [Op.like]: `%${title}%` }
            }
        } else {
            condition['title'] = { [Op.like]: `%${title}%` };
        }
    }

    try {

        const offers = await Offer.findAndCountAll({
            where: condition,
            attributes: { exclude: ['id_offerType', 'id_user'] },
            include: [
                {
                    model: Users,
                    as: "user",
                    attributes: ["firstName", "email"],
                },
                {
                    model: OfferType,
                    as: "offerType",
                    attributes: ["type"],
                }
            ],

        });

        if (count === 0) {

            return res.status(404).json({ error: "No Offers left" });

        } else {
            return res.status(200).json(offers);
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
}

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body can not be empty!" });
        return;
    }

    const offer = await Offer.findOne({ where: { id: req.params.offerID } })
    if (!offer) {
        return res.status(404).json({
            message: `Not found!`,
        });
    }
    if (req.loggedUserId != offer.id_user) {
        res.status(404).json({ message: "Must be logged in with the owner" });
        return;
    } else {
        Offer.findByPk(req.params.offerID)
            .then((offer) => {
                if (offer === null)
                    res.status(404).json({
                        message: `Not found!`,
                    });
                else {
                    offer
                        .update(req.body, { where: { id: req.params.offerID } })
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