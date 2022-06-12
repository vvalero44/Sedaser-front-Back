import {Router} from 'express';
const router = Router()

import * as ClientUserCtrl from '../controllers/clientUser.controller';
import {authJwt, verifySignup} from '../middlewares'

router.get('/',[authJwt.verifyToken, authJwt.isUser, verifySignup.checkRolesExisted] ,ClientUserCtrl.renderWorks);

export default router;