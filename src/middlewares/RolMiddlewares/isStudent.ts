import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/dbConfig';
import { JWT_SECRET } from '../../keys';

export const isStuden = async (req: Request, res: Response, next: NextFunction )=>{
    
    try {
        let token: any = req.headers.authorization;
        
        if(!token){
            throw new Error('Token no registrado')
        };

        token = token.split(" ")[1];
        const decode = jwt.verify(token, JWT_SECRET);
        const { id } = decode as { id: number };
        const user = await prisma.usuario.findUnique({
            where: {
                id: id
            }
        });

        if(!user){
            throw new Error('No exsite.');
        };

        if(user?.rol !== 'ALUMNO'){
            throw new Error('Acceso denegado');
        };
        next()
    } catch (error) {
        if(error instanceof Error){
            res.status(403).json({
                msg: `Error: ${error}`,
                status: 403 
            })
        } 
    }
};

