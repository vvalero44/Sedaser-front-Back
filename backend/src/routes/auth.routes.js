import {Router} from 'express';
const router = Router();
import * as authCtrl from '../controllers/auth.controller';
import {verifySignup} from '../middlewares'


router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);

router.post('/login', authCtrl.signin);



export default router;