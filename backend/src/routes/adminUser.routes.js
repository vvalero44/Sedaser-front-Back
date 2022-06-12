import {Router} from 'express';
const router = Router()
//import authRoutes from "./auth.routes";
import * as AdminUserCtrl from '../controllers/adminUser.controller';
import {authJwt, verifySignup} from '../middlewares'
//**************************************************************************************************************************//
//-----------------------------------------------LISTAR TIPOS DE USUARIOS---------------------------------------------------//
//**************************************************************************************************************************//

//EL ADMIN LISTA USUARIOS Y ADMINISTRADORES
router.get('/ListUsers',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted] ,AdminUserCtrl.ListUsers);
router.get('/ListAdmins',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted] ,AdminUserCtrl.ListAdmins);

//**************************************************************************************************************************//
//-------------------------------------------------------WORK AREAS---------------------------------------------------------//
//**************************************************************************************************************************//
//GET-------TRAER TODOS LOS TRABAJOS del usuario
router.get('/GetUserWorks/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.GetUserWorks)
//POST------TRABAJOS a usuarios
router.post('/PostEdithUserWork/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.PostWorkUser)
//GET-------EDITAR TRABAJOS DE LOS usuarios: traer los datos del trabajo editado
router.get('/GetEdithUserWork/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.GetEditUser)
//PUT-------ACTUALIZAR UN TRABAJO usuarios: actualizar los datos de los usuarios
router.put('/PutEdithUserWork/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.PutUserWork)
//DELETE----ELIMINAR UN TRABAJO del usuario
router.delete('/DeleteEdithUserWork/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.DeleteUserWork)

//**************************************************************************************************************************//
//-------------------------------------------------------EDITH USERS---------------------------------------------------------//
//**************************************************************************************************************************//

//GET-------EDITAR DATOS DEL usuario: traer los datos del usuario para editarlo
router.get('/GetEdithUser/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.GetUser)
//PUT-------ACTUALIZAR DATO DEL usuario: actualizar los datos de los usuarios
router.put('/PutEdithUser/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.PutUser)
//DELETE----ELIMINAR UN TRABAJO del usuario
router.delete('/DeleteEdithUser/:id',[authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], AdminUserCtrl.DeleteUser)



export default router;