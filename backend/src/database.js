/*
Aqui realizamos la conexion a la base de datos a traves de mongoose
*/
require('dotenv').config()



import mongoose from "mongoose";

const URI = `mongodb://db/sedaserAppGestionClient`
//conectamos a la base de datos
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(db=>console.log('DB esta conectado', db.connection.host))
.catch(err=>console.log('Error', err))