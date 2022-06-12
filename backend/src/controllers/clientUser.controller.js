import WorkSpace from "../models/WorkSpace";
import jwt from "jsonwebtoken";
import config from "../config"; //palabra para decodificar
//MOSTRAR LOS DATOS SEGUN EL USUARIO
export const renderWorks = async (req, res) => {
  console.log("RENDER WORKS ==============>");
  let decodedToken = {};
  //recuperar token del header
  const authorization = req.get("authorization");

  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (e) {
    console.log("ERROR===>", e);
  }
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }
  //==============================================
  const workSpace = await WorkSpace.find({ user: decodedToken.id })
    .sort({ date: "desc" })
    .lean();
  console.log("Usuario==>", decodedToken.id);
  res.json(workSpace);
};
