import dotenv from 'dotenv';

import { reqToken } from './middlewares/jwtMiddlewares/check-token';
import { validation } from './middlewares/validatorMiddleware/validationMiddleware';
import { userSchema } from './validations/auth-validations/user';
import { loginSchema } from './validations/auth-validations/login';
import { isStuden } from './middlewares/RolMiddlewares/isStudent';
import { isTeacher } from './middlewares/RolMiddlewares/isTeacher';
import { comparePassword, encriptPassword } from './utils/bcrypt';
import { corsOptions } from './utils/corsOptions';
import { generateJwt } from  './utils/generateJwt';
import { refreshToken } from './utils/refreshJwt';
import { limiter } from './utils/limiter';


dotenv.config({path:'.env'})


const PORT = process.env.PORT as string;
const JWT_SECRET = process.env.JWT_SECRET as string;


export  {
    PORT,
    JWT_SECRET,
    reqToken,
    validation,
    encriptPassword,
    comparePassword,
    corsOptions,
    generateJwt,
    refreshToken,
    limiter,
    userSchema,
    loginSchema,
    isStuden,
    isTeacher
};