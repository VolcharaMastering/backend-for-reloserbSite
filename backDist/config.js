"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        db: {
            host: process.env.DB_HOST_DEV,
            port: process.env.DB_PORT_DEV,
            name: process.env.DB_NAME_DEV,
        },
        secretKey: process.env.SECRET_KEY_DEV,
    },
    production: {
        db: {
            host: process.env.DB_HOST_PROD,
            port: process.env.DB_PORT_PROD,
            name: process.env.DB_NAME_PROD,
        },
        secretKey: process.env.SECRET_KEY_PROD,
    },
};
exports.default = config;
