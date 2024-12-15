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
exports.isStuden = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../../db/dbConfig");
const barrel_1 = require("../../barrel");
const isStuden = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error('Token no registrado');
        }
        ;
        token = token.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, barrel_1.JWT_SECRET);
        const { id } = decode;
        const user = yield dbConfig_1.prisma.usuario.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new Error('No exsite.');
        }
        ;
        if ((user === null || user === void 0 ? void 0 : user.rol) !== 'ALUMNO') {
            throw new Error('Acceso denegado');
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
exports.isStuden = isStuden;
