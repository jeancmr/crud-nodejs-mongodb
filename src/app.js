const path = require("path");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
// Connecting to db
mongoose
  .connect("mongodb://localhost/crud-mongo")
  .then((db) => console.log("Db connected"))
  .catch((err) => console.log(err));

// Importing routesS
const indexRoutes = require("./routes/index");
// Settings
app.set("port", process.env.PORT || 3000); //PUERTO POR DEFECTO DEL SISTEMA
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //VIEW ENGINE. MOTOR DE PLANTILLAS (EJS)
//
// Middlewares (Una funcion que se ejecuta antes de que lleguen a las rutas)
app.use(morgan("dev")); //Para ver mensajes cortos
app.use(express.urlencoded({ extended: false })); //metodo para entender los datos que le envia un formulario. A traves de este modulo el servidor puede entender los datos y almacenar los datos

//Routes
app.use("/", indexRoutes);

// Starting server
app.listen(app.get("port"), () => {
  console.log(`Server on Port ${app.get("port")}`);
});
