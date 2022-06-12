/*
Aqui estan las sub rutas con sus metodos PUT, POST, GET DELETE y dependiendo si el usuario tiene ciertos permisos
o no, lo deja acceder a una ruta o no
*/
import {Router} from 'express';
const router = Router();
//
import * as productsCtrl from '../controllers/products.controller';
import {authJwt} from '../middlewares'
//=============================================================
//RUTA DE USUARIO AUTENTICADO
router.get('/',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.getProducts)

//====================================================================================================
//*************************RUTAS DE ADMINISTRADOR************************************************
//listar usuarios
//router.get('/',[authJwt.verifyToken, authJwt.isModerator],userAdminCtrl.getUsers);
//router.get('/:userID',[authJwt.verifyToken, authJwt.isModerator],userAdminCtrl.getUsers);
//router.get()
router.post('/',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)
router.get('/:productId',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.getProductById)
router.put('/:productId',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById)
router.delete('/:productId',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.deleteProductById)



export default router;