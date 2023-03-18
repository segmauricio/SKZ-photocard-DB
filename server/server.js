require('dotenv').config()
const express = require("express");                             // Importación del paquete express
const cors = require('cors');                                   // Importación CORS
const cookieParser = require("cookie-parser");

const app = express();                                          //Creando instancia llamada app
const port = process.env.PUERTO;                                              //asignación del puerto del servidor

//Para usar json y obtener URL data
app.use(express.json()), app.use(express.urlencoded({ extended: true })); // Uso de política de orígenes

app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

//Cookies
app.use(cookieParser());

//DB init
require("./config/mongoose.config");                            //Conexión a DB

//Routes
const skzRoutes = require('./routes/skz.routes');             // Incluir modulo de rutas
skzRoutes(app);     

app.listen(port, () => console.log(`Listening on port: ${port}`));

