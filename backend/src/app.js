/*
Aqui tenemos la configuracion princpial del servidor, y se establecen las rutas principales del servidor

*/

//IMPORTACIONES
import express from "express"; //=> Framework de express
import morgan from "morgan"; //Midelware de express
import pkg from "../package.json"; //=> Archivo de configuracion del proyecto, para obtener los datos
import productsRoutes from "./routes/products.routes"; //=> Rutas de productos vendria a ser una sub ruta con metodos POST, DELETE, PUT y GET
import authRoutes from "./routes/auth.routes"; //=> Rutas de autenticacion vendria a ser una sub ruta con metodos POST, DELETE, PUT y GET
import { createRoles, createNativeUsers } from "./libs/initialSetup"; //=> Rutas de roles vendria a ser una sub ruta con metodos POST, DELETE, PUT y GET
import usersRoutes from "./routes/user.routes"; //Ruta de usuarios vendria a ser una sub ruta con metodos POST, DELETE, PUT y GET
import clientUser from "./routes/clientUser.routes";
import adminUser from "./routes/adminUser.routes";
const cors = require("cors");
//====================================================
const app = express();
createRoles(); //=> Se ejecuta solo una vez en todo el programa


setTimeout(() => {
  createNativeUsers();
}, 1000);



app.set("pkg", pkg); //Se crea una variable con el nombre pkg para poder acceder a la informacion de package.json

app.use(morgan("dev"));
app.use(express.json()); //=> Aqui se usa un modulo de express para poder tranajar con formatos json en el servidor
app.use(cors());
//================================================================
//DESCRIPCION DEL SERVIDOR
app.get("/", (req, res) => {
  //=> Aqui se imprime la informacion de package.json en la consola del cliente
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

//=============================================================
//RUTAS PRINCIPALES
app.use("/api/auth", authRoutes); //Crea o logea usuarios
app.use("/api/users", usersRoutes); //Ruta de usuarios y con su subruta
app.use("/api/profile", clientUser); //Ruta en la que solo se puede acceder desde el cliente y a su perfil
app.use("/api/admin", adminUser);
export default app;
