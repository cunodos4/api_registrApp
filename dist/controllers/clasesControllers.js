"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAsistencia = exports.getByUserIdAndRamoID = exports.clasesRegister = void 0;
const dbConfig_1 = require("../db/dbConfig");
const clasesRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, usuarioId, ramoId } = req.body;
    if (!fecha || !Array.isArray(fecha) || fecha.length === 0 || !ramoId) {
        res.status(400).json({ error: 'Faltan datos requeridos o fecha no es un arreglo de fechas válido' });
    }
    if (!usuarioId || !Array.isArray(usuarioId) || usuarioId.length === 0 || !usuarioId) {
        res.status(404).json({ error: 'Faltan datos de usuario' });
    }
    ;
    try {
        // Preparar los datos para `createMany`
        const data = usuarioId.flatMap((id) => fecha.map((f) => ({
            fecha: [new Date(f)], // Arreglo de fechas
            usuarioId: id,
            ramoId,
            asistencia: false
        })));
        // Usar createMany para insertar múltiples registros
        const nuevasClases = yield dbConfig_1.prisma.clases.createMany({
            data,
            skipDuplicates: true // Opcional: evita registros duplicados si ya existen
        });
        res.status(201).json({
            msg: 'Clases registradas exitosamente',
            count: nuevasClases.count
        });
    }
    catch (error) {
        console.error('Error al crear la clase:', error);
        res.status(500).json({ error: 'Error al crear la clase' });
    }
});
exports.clasesRegister = clasesRegister;
const getByUserIdAndRamoID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, ramoId } = req.params;
    try {
        const usuario = yield dbConfig_1.prisma.usuario.findMany({
            where: { id: Number(userId), },
        });
        if (!usuario) {
            throw Error('No existe el usuario');
        }
        ;
        const ramo = yield dbConfig_1.prisma.ramos.findFirst({
            where: { id: Number(ramoId) },
        });
        if (!ramo) {
            throw Error('No hay un ramo registrado');
        }
        const clases = yield dbConfig_1.prisma.clases.findMany({
            where: {
                usuarioId: Number(userId),
                ramoId: Number(ramoId)
            },
            select: {
                fecha: true,
                asistencia: true,
            }
        });
        res.json({ clases });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al traer los datos.' });
    }
});
exports.getByUserIdAndRamoID = getByUserIdAndRamoID;
const updateAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut, idFecha } = req.params;
    try {
        // Buscar al usuario por su rut
        const usuario = yield dbConfig_1.prisma.usuario.findUnique({
            where: {
                rut: rut
            }
        });
        if (!usuario) {
            res.status(404).json({ error: 'No existe el usuario.' });
        }
        // Actualizar la asistencia
        const updateAsistencia = yield dbConfig_1.prisma.clases.update({
            where: {
                id: Number(idFecha),
                usuarioId: usuario === null || usuario === void 0 ? void 0 : usuario.id
            },
            data: {
                asistencia: true
            },
        });
        // Comprobar si la actualización fue exitosa
        if (!updateAsistencia || updateAsistencia.asistencia === true) {
            res.status(404).json({ error: 'Clase no registrada o no encontrada.' });
        }
        ;
        // Respuesta exitosa
        res.status(200).json({
            msg: 'Asistencia actualizada correctamente.',
            code: 200,
            status: true // Puedes devolver el objeto actualizado si lo deseas
        });
    }
    catch (error) {
        console.error('Error al actualizar la asistencia:', error);
        res.status(500).json({
            msg: "Error al actualizar la asistencia.",
            error: 'Error desconocido.'
        });
    }
});
exports.updateAsistencia = updateAsistencia;
