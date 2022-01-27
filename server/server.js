require("dotenv").config();
require("./config/config");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { errorHandler, error404 } = require("./error/errorHandler");

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routers
app.use("/api/student", require("./router/student"));

//Manejador de errores
app.use(errorHandler);
app.use(error404);

//Conexión a BD
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexión a BD exitosa");
  })
  .catch(() => {
    console.log("Conexión a BD fallida");
  });

app.listen(process.env.PORT, (err) => {
  console.log(`Escuchando puerto ${process.env.PORT}`);
});
