import User from "../models/User";
import Role from "../models/Role";
import WorkSpace from "../models/WorkSpace";
//**************************************************************************************************************************//
//-------------------------------------------------------LIST USERS and ADMINS----------------------------------------------//
//**************************************************************************************************************************//
//LISTAR USUARIOS
export const ListUsers = async (req, res) => {
  try {
    const defaultRoleUser = await Role.find({name:'user'})
    
    const userClient = await User.find({ roles: defaultRoleUser[0]._id}); //ID DEL ROL USUARIO
    res.json(userClient);
  } catch (err) {
    res.status(500).json({ err: "Get List Users" });
  }
};
//LISTAR ADMINISTRADORES
export const ListAdmins = async (req, res) => {
  try {
    const defaultRoleAdmin = await Role.find({name:'admin'})
    
    const userClient = await User.find({ roles: defaultRoleAdmin[0]._id }); //ID DEL ROL ADMINISTRADOR
    res.json(userClient);
  } catch (err) {
    res.status(500).json({ err: "Get List Admins" });
  }
};
/*
//LISTAR MODERATOR
export const ListModerators = async (req, res)=>{
  const userClient = await User.find({roles:'62727ea2570fd369b2d499a1'}); //ID DEL ROL MODERATOR
  res.json(userClient)
}
*/
//**************************************************************************************************************************//
//-------------------------------------------------------WORK AREAS---------------------------------------------------------//
//**************************************************************************************************************************//

//POST----------------AGREGAR TAREAS AL USUARIO
export const PostWorkUser = async (req, res) => {
  try{const { startDay, endDay, description, comments, time, technical } = req.body;

  const newWorkSpace = new WorkSpace({
    startDay,
    endDay,
    description,
    comments,
    time,
    technical,
    user: req.params.id,
  });
  await newWorkSpace.save();
  res.json(newWorkSpace);}catch(err){
    res.status(500).json({error: "Save Work User"})
  }
};

//GET----------------LISTAR WORKs DEL USUARIO: trae todas las tareas al front-end
export const GetUserWorks = async (req, res) => {
  try {
    const WorksUser = await WorkSpace.find({ user: req.params.id })
      .sort({ date: "desc" })
      .lean();
    res.json(WorksUser);
  } catch (err) {
    res.status(500).json({ error: "Get User Works " });
  }
};

//------------------------------------------------------------------------------------------------------------------

//GET----------------EDITAR TAREA DE USUARIO:traer la tarea seleccionada para poder editarla en el front-end
export const GetEditUser = async (req, res) => {
  try {
    const GetWorkSpace = await WorkSpace.findById({ _id: req.params.id });
    res.json(GetWorkSpace);
  } catch (err) {
    res.status(500).json({ err: "Get Edith User" });
  }
};
//PUT----------------ACTUALIZAR UN SOLO WORK
export const PutUserWork = async (req, res) => {
  try {
    const updateWork = await WorkSpace.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(204).json(updateWork);
  } catch (err) {
    res.status(500).json({ err: "Put User Work" });
  }
};

//DELETE-------------ELIMINAR UN SOLO WORK
export const DeleteUserWork = async (req, res) => {
  try {
    await WorkSpace.findByIdAndDelete(req.params.id);
    res.json("WORK ELIMINADO CORRECTAMENTE");
  } catch (err) {
    res.status(500).json({ err: "Delete user work" });
  }
};
//**************************************************************************************************************************//
//-------------------------------------------------------EDITH USERS--------------------------------------------------------//
//**************************************************************************************************************************//

//GET----------------EDITAR TAREA DE USUARIO:traer la tarea seleccionada para poder editarla en el front-end
export const GetUser = async (req, res) => {
  try {
    const GetUser = await User.findById({ _id: req.params.id });
    res.json(GetUser);
  } catch (err) {
    res.status(500).json({ err: "Error Get User" });
  }
};
//PUT----------------ACTUALIZAR UN SOLO WORK
export const PutUser = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(204).json(updateUser);
  } catch (err) {
    res.status(500).json({ err: "ERROR DEL PUT USER" });
  }
};

//DELETE-------------ELIMINAR UN SOLO WORK
export const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await WorkSpace.deleteMany({ user: req.params.id });
    res.status(204).json({ message: "Eliminado" });
  } catch (error) {
    res.status(500).json({ message: `ERROR al elminar usuario${error}` });
  }
};
