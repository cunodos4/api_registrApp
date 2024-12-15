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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../db/dbConfig");
const bcrypt_1 = require("../utils/bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, email, contrasena, rol } = req.body;
    let usuario = yield dbConfig_1.prisma.usuario.findUnique({ where: { email } });
    if (usuario) {
        var msg = 'El usuario ya existe.';
        throw new Error(msg);
    }
    const newPassword = (0, bcrypt_1.encriptPassword)(contrasena);
    usuario = yield dbConfig_1.prisma.usuario.create({
        data: {
            rut,
            primerNombre,
            segundoNombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            contrasena: newPassword,
            rol
        }
    });
    res.status(200).json({
        msg: 'Registro exitoso',
        code: 200
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.body;
    try {
        let usuario = yield dbConfig_1.prisma.usuario.findFirst({ where: { email } });
        if (!usuario) {
            throw Error('El usuario no existe.');
        }
        const validPassword = yield (0, bcrypt_1.comparePassword)(contrasena, usuario.contrasena);
        if (!validPassword) {
            throw Error('Contraseña incorrecta');
        }
        ;
        const jw_secrtet = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({
            id: usuario.id,
            createAt: usuario.createAt
        }, jw_secrtet, { expiresIn: '1h' });
        res.json({
            id: usuario.id,
            nombre: `${usuario.primerNombre} ${usuario.apellidoPaterno}`,
            rut: usuario.rut,
            rol: usuario.rol,
            token: token
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield dbConfig_1.prisma.usuario.findMany();
    res.json([users]);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield dbConfig_1.prisma.usuario.findUnique({ where: { id: Number(id) } });
        if (!user) {
            throw Error('Usuario no existe.');
        }
        console.log(user);
        res.json({ user: user });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getUserById = getUserById;
