const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

//const carts = require("./routes/carts_route.js");

// Sync Tables
const db_tables = require('./models/index');

const auth = require('./routes/auth.routes.js');

const users = require("./routes/user.routes.js");

const userTypes = require("./routes/userType.routes.js");

const roomTypes = require("./routes/roomType.routes.js");

const offerTypes = require("./routes/offerType.routes.js");

const accommodation = require("./routes/accommodation.routes.js");

const offer = require("./routes/offer.routes.js");

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<html><body><h1>Projeto de Programação Web II</h1><br><h3>Author: Margarida Ramos</h3><h4>nº 9140369</h4></body></html>');
})

app.use("/auth", auth)

app.use("/user", users)

app.use("/usertype", userTypes)

app.use("/roomtype", roomTypes)

app.use("/offertype", offerTypes)

app.use("/accommodation", accommodation)

app.use("/offer", offer)

app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})

app.listen(port, () => {
    console.log("Server Running on port " + port);
});