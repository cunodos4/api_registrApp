import {  Request, Response, NextFunction }  from 'express'; 
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../keys';



export const reqToken = (req: Request, res: Response, next: NextFunction)=>{
  try {
    let token: any = req.headers?.authorization;
    if(!token){
      throw new Error('El token no existe');
    };

    token = token.split(" ")[1]; // Esto se hace para que en el jwt.verify pueda verificar el token
    
    jwt.verify(token, JWT_SECRET);

    next();
  } catch (error) {
    if(error instanceof Error){
      res.status(401).json({
        msg: error.message
      })
    };
    res.status(500).json({
      error: 'Error desconocido'
    });
  }
};

