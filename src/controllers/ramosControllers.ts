import { Request, Response } from 'express';
import { prisma } from '../db/dbConfig';



export const ramosRegister = async (req: Request, res: Response)=>{
        const { nombre, seccion, rut} = req.body;
    
       try {
        const nombreUsuario = await prisma.usuario.findUnique({
            where: { rut: rut }
        });
        
        if(!nombreUsuario){
            res.status(401).json({
                msg: "No existe el usuario."
            });
        };
        
        let ramo = await prisma.ramos.create({
            data:{
                nombre: nombre,
                seccion: seccion,
                usuario: {
                    connect: { id: nombreUsuario!.id },
                }
            }
        });
    
        res.status(200).json({
            msg: 'Registro exitoso', 
            code: 200,
            nombre: ramo.nombre,
            seccion: ramo.seccion,
        });
        
       } catch (error) {
            console.error('Error: ', error)
            res.status(500).json('Error: no hay información')
       }
};


export const getAllRamos = async (_req: Request, res: Response)=>{
    const data = await prisma.ramos.findMany();

    res.json(data);
};



export const getRamosByUserId = async (req: Request, res: Response)=>{
    const { rut }= req.params;
    const usuario = await prisma.usuario.findUnique({
        where: {
            rut: rut
        }
    });

    const ramos = await prisma.ramos.findMany({
        where: { usuarioId: usuario?.id },
        select: {
            id: true,
            nombre: true,
            seccion: true,
            clases: true
        }
    });

    if(!ramos || ramos.length === 0){
        res.status(401).json({
            msg:' ERROR 404: Ramo no registrado'
        });
    };

    let nombreUsuario: string = `${usuario?.primerNombre} ${usuario?.apellidoPaterno}`;

    const ramosConProfesor = ramos.map(ramo => ({
        id: ramo.id,
        nombre: ramo.nombre,
        seccion: ramo.seccion,
        profesor: nombreUsuario
    }));
    res.json(ramosConProfesor)
};