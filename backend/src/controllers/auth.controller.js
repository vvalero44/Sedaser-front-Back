import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
//=======================================================================================================================
//=======================================================================================================================
//CREAR USUARIO
export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  try {
    //
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });
    //
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
      console.log("======>Existe", newUser.roles);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [roles._id];
      console.log("=====>No EXiste", newUser);
    }
    //
    const savedUser = await newUser.save();
    console.log(savedUser);
    //Tokens
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, //24 horas
    });
    res.status(200).json({ token: token });
  } catch (err) {
    res.json({ message: "ERROR DEL CATCH DEL SERVIDOR:" + err });
  }
};

//=======================================================================================================================
//=======================================================================================================================
//INICIAR SESION
export const signin = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate('roles')

    console.log("USER FOUND", userFound);
    if (!userFound) {
      return res.status(400).json({ message: "Email incorrecto" });
    }

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      return res
        .status(401)
        .json({ token: null, message: "Contraseña incorrecta" });
    }
    const userToken = {
      id: userFound._id,
      username: userFound.username,
      roles: userFound.roles[0].name,
    };
    const token = jwt.sign(userToken, config.SECRET, {
      expiresIn: 86400,
    });
    console.log(userFound);

    res.send({
      userToken: userToken,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};
