/*
En este documento se crean nuevos roles en caso de que no exitan en la base de datos
*/
//========================================================================================
//IMPORTACIONES
import Role from "../models/Role";
import User from "../models/User";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount(); //=> Cuenta la cantidad de docmentos que se encuentran en la coleccion

    if (count > 0) return; //=> En el caso de que exista algun documento, No hace nada, en caso contrario, crea los 3 docuemntos de a bajo

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (err) {
    console.error(err);
  }
};

export const createNativeUsers = async () => {
  try {
    const count = await User.estimatedDocumentCount(); //=> Cuenta la cantidad de docmentos que se encuentran en la coleccion

    if (count > 0) return; //=> En el caso de que exista algun documento, No hace nada, en caso contrario, crea los 3 docuemntos de a bajo
    const defaultRoleUser = await Role.find({name:'user'})

    const defaultRoleAdmin = await Role.find({name:'admin'})

    const defaultRoleModrator = await Role.find({name:'moderator'})

    const values = await Promise.all([
      new User({
        username: "NativeUser",
        email: "NativeUser@gmail.com",
        password: await User.encryptPassword("NativeUser"),
        roles: defaultRoleUser[0]._id,
      }).save(),
      new User({
        username: "NativeAdmin",
        email: "NativeAdmin@gmail.com",
        password: await User.encryptPassword("NativeAdmin"),
        roles: defaultRoleAdmin[0]._id,
      }).save(),
      new User({
        username: "NativeModerator",
        email: "NativeModerator@gmail.com",
        password: await User.encryptPassword("NativeModerator"),
        roles: defaultRoleModrator[0]._id,
      }).save(),
    ]);

    console.log(values);
    //
    console.log('USER DEFAULT ROLE',defaultRoleUser[0]._id);
    console.log('ADMIN DEFAULT ROLE',defaultRoleAdmin[0]._id)
    console.log('MODERATOR DEFAULT ROLE',defaultRoleModrator[0]._id)
  } catch (err) {
    console.error('ERROR DEL CATCH',err);
  }
};
