import {verify} from 'jsonwebtoken';
import { JWT_SECRET  } from '../barrel';
import * as dotenv from 'dotenv';


dotenv.config({path: '.env'});


export const verifyJwt = (token: string) =>{
    const  v = verify(token, JWT_SECRET );
    return v
}