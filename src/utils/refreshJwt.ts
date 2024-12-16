import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config({path: '.env'});

export const refreshToken = (userId: any ) => {
    const jw_secret = process.env.REFRESH_TOKEN_SECRET as string;
    const refreshToken = jwt.sign(
        { id: userId.id, email: userId.email }, // Información mínima
        jw_secret,
        { expiresIn: '1d' }  // Duración más larga
    );
    return refreshToken;
};