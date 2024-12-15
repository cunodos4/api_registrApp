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
exports.getRamosByUserId = exports.getAllRamos = exports.ramosRegister = void 0;
const dbConfig_1 = require("../db/dbConfig");
const ramosRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, seccion, rut } = req.body;
    try {
        const nombreUsuario = yield dbConfig_1.prisma.usuario.findUnique({
            where: { rut: rut }
        });
        if (!nombreUsuario) {
            res.status(401).json({
                msg: "No existe el usuario."
            });
        }
        ;
        let ramo = yield dbConfig_1.prisma.ramos.create({
            data: {
                nombre: nombre,
                seccion: seccion,
                usuario: {
                    connect: { id: nombreUsuario.id },
                }
            }
        });
        res.status(200).json({
            msg: 'Registro exitoso',
            code: 200,
            nombre: ramo.nombre,
            seccion: ramo.seccion,
        });
    }
    catch (error) {
        console.error('Error: ', error);
        res.status(500).json('Error: no hay información');
    }
});
exports.ramosRegister = ramosRegister;
const getAllRamos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dbConfig_1.prisma.ramos.findMany();
    res.json(data);
});
exports.getAllRamos = getAllRamos;
const getRamosByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    const usuario = yield dbConfig_1.prisma.usuario.findUnique({
        where: {
            rut: rut
        }
    });
    const ramos = yield dbConfig_1.prisma.ramos.findMany({
        where: { usuarioId: usuario === null || usuario === void 0 ? void 0 : usuario.id },
        select: {
            id: true,
            nombre: true,
            seccion: true,
            clases: true
        }
    });
    if (!ramos || ramos.length === 0) {
        res.status(401).json({
            msg: ' ERROR 404: Ramo no registrado'
        });
    }
    ;
    let nombreUsuario = `${usuario === null || usuario === void 0 ? void 0 : usuario.primerNombre} ${usuario === null || usuario === void 0 ? void 0 : usuario.apellidoPaterno}`;
    const ramosConProfesor = ramos.map(ramo => ({
        id: ramo.id,
        nombre: ramo.nombre,
        seccion: ramo.seccion,
        profesor: nombreUsuario
    }));
    res.json(ramosConProfesor);
});
exports.getRamosByUserId = getRamosByUserId;
