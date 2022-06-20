const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/roomTypes.controllers");

router.route("/create")
    .post(
        [
            body("type").notEmpty().escape()
        ],
        function (req, res) {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                controller.createRoomType(req, res);
            } else {
                res.status(400).send(errors);
            }
        }
    );

router.route("/all")
    .get(async function (req, res) {
        controller.getAllRoomTypes(req, res);
    })

module.exports = router;