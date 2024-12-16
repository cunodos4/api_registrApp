import { Request, Response } from 'express';
import { prisma } from '../db/dbConfig';
import { encriptPassword, comparePassword, generateJwt, refreshToken, 
    generateResetToken, sendResetEmail, verifyJwt } from '../barrel';

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
    
    const token = generateJwt(usuario.id);
    await prisma.usuario.update({where:{id: usuario.id}, data:{ token: token }});
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



export const refreshTokens = async (req: Request, res: Response ) =>{
    const { id } = req.body;

    const token = refreshToken(id);

    await prisma.usuario.update({
        where:{
            id: id
        }, 
        data: {
            token: token
        }
    });
    res.json({
        msg: 'Todo ok',
        code: 200
    });
};


export const resetMail = async (req: Request, res: Response) =>{
    const { email } = req.body;
    try {
        const usuario =  await prisma.usuario.findUnique({where: {
            email: email
        }});
    
        if(!usuario){
            res.status(404).json('Error: no existe el usuario');
        };

        const usuarioId: string | undefined = usuario?.id.toString();
        const token = generateResetToken(usuarioId);

       

        await sendResetEmail( usuario?.email as string, token as string);

        res.json('Enviado');

    
    } catch (error) {
        if(error as typeof Error){
            res.send({
                error: 'Error'
            })
        }        
    }
};


export const resetPassword = async ( req: Request, res: Response ) => {
    const { newPassword , token } = req.body;

    try {
        
        const decode: any = verifyJwt(token);

        await prisma.usuario.update({
            where:{
                email: decode.email
            }, 
            data:{
                contrasena: newPassword
            }
            
        });

    } catch (error) {
        res.status(404).json({msg: `Error: ${error}`})
    }

};