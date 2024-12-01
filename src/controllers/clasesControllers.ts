import { Request, Response } from 'express';
import { prisma } from '../db/dbConfig';




export const clasesRegister = async (req: Request, res: Response)=>{
        const { fecha, usuarioId, ramoId } = req.body;
      
        if (!fecha || !Array.isArray(fecha) || fecha.length === 0 || !ramoId) {
            res.status(400).json({ error: 'Faltan datos requeridos o fecha no es un arreglo de fechas válido' });
        }
        if(!usuarioId|| !Array.isArray(usuarioId) || usuarioId.length === 0 || !usuarioId ){
            res.status(404).json({error: 'Faltan datos de usuario'});
        };
      
        try {
               // Preparar los datos para `createMany`
        const data = usuarioId.flatMap((id: number) =>
            fecha.map((f: string) => ({
                fecha: [new Date(f)], // Arreglo de fechas
                usuarioId: id,
                ramoId,
                asistencia: false
            }))
        );

        // Usar createMany para insertar múltiples registros
        const nuevasClases = await prisma.clases.createMany({
            data,
            skipDuplicates: true // Opcional: evita registros duplicados si ya existen
        });

        res.status(201).json({
            msg: 'Clases registradas exitosamente',
            count: nuevasClases.count
        });
        } catch (error) {
          console.error('Error al crear la clase:', error);
          res.status(500).json({ error: 'Error al crear la clase' });
        }
};

export const getByUserIdAndRamoID = async (req: Request, res: Response)=>{
    const { userId, ramoId} =  req.params;

   try {
    const usuario = await prisma.usuario.findMany({
        where: { id:Number(userId),},
    });


    if(!usuario){
        throw Error('No existe el usuario');
    };

    const ramo = await prisma.ramos.findFirst({
        where: { id:Number(ramoId)},
    });

    if(!ramo){
        throw Error('No hay un ramo registrado')
    }

    const clases = await prisma.clases.findMany({
        where:{
            usuarioId: Number(userId),
            ramoId: Number(ramoId)
        },
        select: {
            fecha: true,
            asistencia: true,
        }
    });


    res.json({ clases });
   } catch (error) {
    res.status(500).json({ error: 'Error al traer los datos.' });
   }
};

export const updateAsistencia = async (req: Request, res: Response) => {
    const { rut, idFecha } = req.params;

    try {
        // Buscar al usuario por su rut
        const usuario = await prisma.usuario.findUnique({
            where: {
                rut: rut
            }
        });

        if (!usuario) {
            res.status(404).json({ error: 'No existe el usuario.' });
        }

        // Actualizar la asistencia
        const updateAsistencia = await prisma.clases.update({
            where: {
                id: Number(idFecha),
                usuarioId: usuario?.id
            },
            data: {
                asistencia: true
            },
        });

        // Comprobar si la actualización fue exitosa
        if (!updateAsistencia || updateAsistencia.asistencia === true ) {
            res.status(404).json({ error: 'Clase no registrada o no encontrada.' });
        };


        // Respuesta exitosa
        res.status(200).json({
            msg: 'Asistencia actualizada correctamente.',
            code: 200,
            status: true // Puedes devolver el objeto actualizado si lo deseas
        });
    } catch (error) {
        console.error('Error al actualizar la asistencia:', error);
        res.status(500).json({
            msg: "Error al actualizar la asistencia.",
            error: 'Error desconocido.'
        });
    }
};

