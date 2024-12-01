import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/dbConfig';
import { JWT_SECRET } from '../../keys';

export const isTeacher = async (req: Request, res: Response, next: NextFunction )=>{

    try {
        let token: any = req.headers.authorization;
        if(!token){
            res.status(401).json('Token no registrado');
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
            res.status(401).json('No exsite.')
        };

        if(user?.rol !== 'PROFESOR'){
            res.status(403).json('Acceso denegado');
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

