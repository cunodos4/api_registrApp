import { Router } from 'express';
import * as ramosCtrl from '../controllers/ramosControllers';
import { reqToken } from '../barrel';


const router = Router();

router.post('/ramos/register', ramosCtrl.ramosRegister);
router.get('/ramos/getAll',reqToken ,ramosCtrl.getAllRamos);
router.get('/ramos/:rut', reqToken, ramosCtrl.getRamosByUserId);

export default router;