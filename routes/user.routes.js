const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/auth.controllers.js");
const controller = require("../controllers/users.controllers");



router.route("/:userID")
    .put(authController.verifyToken, controller.updateUser)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'USER: what????' });

});

module.exports = router;