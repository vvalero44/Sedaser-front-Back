/*
Este archivo sera el encargado de iniciar el servidor y conectarse a la base de datos
tambien establece el puerto, e importa toda la configuracion del servidor echa en el archivo
de app
*/


import app from './app';
import './database';

app.listen(4000)



console.log('Server listen on port', 4000)