const Model = require("../models/offerComment.model.js");
const OfferComments = Model.OfferComments;

const { Op } = require("sequelize");


exports.createComment = async (req, res) => {
    try {
        let offerComment = await OfferComments.findOne({
            where: {
                title: req.body.title
            },
        })

        if (offerComment) {
            return res.status(400).send(req.body.title + " already exist!!!!");
        } else {
            offerComment = await OfferComments.create({
                title: req.body.title,
                comment: req.body.comment,
                id_user: req.loggedUserId,
                id_offer: req.params.offerID
            })

            return res.json({ message: "Comment on offer was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}