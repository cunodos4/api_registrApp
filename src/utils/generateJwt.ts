import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config({path: '.env'});

export const generateJwt = (userId: any )=>{
    const jw_secrtet = process.env.JWT_SECRET as string
    
    const token = jwt.sign({
            id: userId.id,
            email: userId.email
        }, 
        jw_secrtet,
        {expiresIn: '8h'}
    );

    return token;

};