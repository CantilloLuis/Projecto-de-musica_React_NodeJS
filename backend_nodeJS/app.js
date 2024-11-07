var express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");
var app = express();
const morgan = require("morgan");
app.use(morgan("tiny"))

app.use(cors())


const musicRoutes = require("./routes/music");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// codigo donde realizamos la conexion con mongo atlas
mongoose
    .connect(process.env.URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Estamos conectados");

    });

//Ruta de la api de autos
app.use('/api/music', musicRoutes);



module.exports = app;
