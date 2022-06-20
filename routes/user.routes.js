const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/users.controllers");

router.route("/register")
    .post(
        [
            body("firstName").notEmpty().escape(),
            body("lastName").notEmpty().escape(),
            body("email").notEmpty().isEmail().escape(),
            body("password").notEmpty().escape(),
        ],
        function (req, res) {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                controller.create(req, res);
            } else {
                res.status(400).send(errors);
            }
        }
    );

module.exports = router;