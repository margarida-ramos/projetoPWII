const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/userTypes.controllers");

router.route("/create")
    .post(
        [
            body("type").notEmpty().escape()
        ],
        function (req, res) {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                controller.createUserType(req, res);
            } else {
                res.status(400).send(errors);
            }
        }
    );

module.exports = router;