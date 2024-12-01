import { Router } from 'express';
import * as ctrClases from '../controllers/clasesControllers';
import { reqToken } from '../middlewares/jwtMiddlewares/check-token';
import { isStuden } from '../middlewares/RolMiddlewares/isStudent';


const router = Router();

router.post('/clases/register', reqToken ,ctrClases.clasesRegister);
router.get('/clases/:userId/:ramoId',reqToken ,ctrClases.getByUserIdAndRamoID);
router.put('/clases/update/:rut/:idFecha', [reqToken, isStuden] ,ctrClases.updateAsistencia);
export default router;