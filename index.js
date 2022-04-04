const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

//const carts = require("./routes/carts_route.js");

// Sync Tables
const db_tables = require('./models/index')

app.use(express.json());

//app.use(auth)

app.get('/', (req, res) => {
    res.send('<html><body><h1>Projeto de Programação Web II</h1><br><h3>Author: Margarida Ramos</h3><h4>nº 9140369</h4></body></html>');
})

app.listen(port, () => {
    console.log("Server Running on port " + port);
});