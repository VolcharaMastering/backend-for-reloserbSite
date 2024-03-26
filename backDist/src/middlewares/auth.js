"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authError_1 = __importDefault(require("../errors/authError"));
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        next(new authError_1.default('Auth is needed'));
        return;
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    }
    catch (e) {
        next(new authError_1.default('Invalid token'));
        return;
    }
    req.user = payload;
    next();
};
module.exports = auth;
