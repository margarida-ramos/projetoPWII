const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/offer.controllers");
const authController = require("../controllers/auth.controllers.js");
const commentController = require("../controllers/offerComments.controllers");

router.route('/')
    .post(authController.verifyToken, authController.isServiceProvider, controller.createOffer)

router.route('/:offerID/comment')
    .post(authController.verifyToken, authController.isUser, commentController.createComment)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'OFFER: what????' });

});

module.exports = router;