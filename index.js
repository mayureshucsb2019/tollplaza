'use strict';

// importing required libraries
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// dotenv is just required to import the env values, not needed otherwise
const dotenv = require('dotenv').config();

// creating app and server
const app = express();
const server = require("http").createServer(app);

// importing custom files
const routes = require("./routes/routes");
const errorController = require("./controllers/errorController");

// const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(cors())

app.use(routes);

app.use(errorController.get404);

// connect to mongodb database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Database connected");
        server.listen(process.env.APPLICATION_PORT, function() {
            console.log(" Server Successfully Started at ",process.env.APPLICATION_PORT);
        });
    });