import { Router } from 'express';
import * as ctrClases from '../controllers/clasesControllers';
import {reqToken, isStuden } from '../barrel';


const router = Router();

router.post('/clases/register', reqToken ,ctrClases.clasesRegister);
router.get('/clases/:userId/:ramoId',reqToken ,ctrClases.getByUserIdAndRamoID);
router.put('/clases/update/:rut/:idFecha', [reqToken, isStuden] ,ctrClases.updateAsistencia);
export default router;