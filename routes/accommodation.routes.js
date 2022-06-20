const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/accommodations.controllers");
const commentController = require("../controllers/accommodationComments.controllers");
const authController = require("../controllers/auth.controllers.js");

router.route('/')
    .post(authController.verifyToken, authController.isServiceProvider, controller.createAccommodation)
    .get(controller.getAll)


router.route('/:accomodationID/comment')
    .post(authController.verifyToken, authController.isUser, commentController.createComment)



router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACCOMMODATIONS: what????' });

});

module.exports = router;