const Model = require("../models/accommodationComment.model.js");
const AccommodationComments = Model.AccommodationComments;

const { Op } = require("sequelize");


exports.createComment = async (req, res) => {
    try {
        let accommodationComment = await AccommodationComments.findOne({
            where: {
                title: req.body.title
            },
        })

        if (accommodationComment) {
            return res.status(400).send(req.body.title + " already exist!!!!");
        } else {
            accommodationComment = await AccommodationComments.create({
                title: req.body.title,
                comment: req.body.comment,
                id_user: req.loggedUserId,
                id_accomodation: req.params.accomodationID
            })

            return res.json({ message: "Comment on accomodation was saved successfully!" });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}