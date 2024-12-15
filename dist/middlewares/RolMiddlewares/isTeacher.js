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
exports.isTeacher = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../../db/dbConfig");
const keys_1 = require("../../keys");
const isTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).json('Token no registrado');
        }
        ;
        token = token.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, keys_1.JWT_SECRET);
        const { id } = decode;
        const user = yield dbConfig_1.prisma.usuario.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            res.status(401).json('No exsite.');
        }
        ;
        if ((user === null || user === void 0 ? void 0 : user.rol) !== 'PROFESOR') {
            res.status(403).json('Acceso denegado');
        }
        ;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({
                msg: `Error: ${error}`,
                status: 403
            });
        }
    }
});
exports.isTeacher = isTeacher;
