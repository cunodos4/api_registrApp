import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/dbConfig';
import { encriptPassword, comparePassword } from '../utils/bcrypt';

import dotenv from 'dotenv';

dotenv.config({path:'.env'})


export const signup = async (req: Request, res: Response )=> {
    const { rut, primerNombre, segundoNombre, 
        apellidoPaterno, apellidoMaterno, email, contrasena, rol } = req.body;
    
        let usuario = await prisma.usuario.findUnique({where:{ email }});
        if(usuario){
            var msg = 'El usuario ya existe.';
            throw new Error(msg);
        }
        const newPassword = encriptPassword(contrasena);
        usuario = await prisma.usuario.create({
            data:{
                rut,
                primerNombre,
                segundoNombre,
                apellidoPaterno,
                apellidoMaterno,
                email,
                contrasena: newPassword,
                rol
            }
        })
    
        res.status(200).json({
            msg: 'Registro exitoso', 
            code: 200
        });
};

export const login = async (req: Request, res: Response)=>{
    const {email, contrasena} = req.body;

    try {
        let usuario = await prisma.usuario.findFirst({where:{ email }});

    if(!usuario){
        throw Error('El usuario no existe.');
    }

    const validPassword = await comparePassword(contrasena, usuario.contrasena);
    
    if(!validPassword){
        throw Error('Contraseña incorrecta');
    };
    
    const jw_secrtet = process.env.JWT_SECRET as string
    
    const token = jwt.sign({
            id: usuario.id,
            createAt: usuario.createAt
        }, 
        jw_secrtet,
        {expiresIn: '1h'}
    );

    res.json({
        id: usuario.id,
        nombre: `${usuario.primerNombre} ${usuario.apellidoPaterno}` as string,
        rut: usuario.rut as string,
        rol: usuario.rol as string,
        token: token as string
    });
    } catch (error) {
       console.error(error) 
    }
};

export const getAllUsers = async (req: Request, res: Response)=>{
    const users = await prisma.usuario.findMany()
    res.json([users]);
};

export const getUserById = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const user = await prisma.usuario.findUnique({where:{id: Number(id)}});
        if(!user){
            throw Error('Usuario no existe.')
        }
        console.log(user);
        res.json({user: user});
    } catch (error) {
        console.error(error);
    }
};

