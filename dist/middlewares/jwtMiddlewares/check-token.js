"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const barrel_1 = require("../../barrel");
const reqToken = (req, res, next) => {
    var _a;
    try {
        let token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            throw new Error('El token no existe');
        }
        ;
        token = token.split(" ")[1]; // Esto se hace para que en el jwt.verify pueda verificar el token
        jsonwebtoken_1.default.verify(token, barrel_1.JWT_SECRET);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({
                msg: error.message
            });
        }
        ;
        res.status(500).json({
            error: 'Error desconocido'
        });
    }
};
exports.reqToken = reqToken;
