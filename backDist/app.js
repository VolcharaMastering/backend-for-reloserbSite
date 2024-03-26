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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const celebrate_1 = require("celebrate");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const notFound_1 = __importDefault(require("./src/errors/notFound"));
const errorHandler_1 = __importDefault(require("./src/middlewares/errorHandler"));
const routes_1 = __importDefault(require("./src/routes"));
const { PROJ_PORT_DEV = 3000, PROJ_PORT_PROD = 3044 } = process.env;
const environment = process.env.NODE_ENV || 'development';
const dbConfig = environment === 'production' ? config_1.default.production.db : config_1.default.development.db;
const portConfig = environment === 'production' ? PROJ_PORT_PROD : PROJ_PORT_DEV;
const connectionString = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
const app = (0, express_1.default)();
app.use(express_rate_limit_1.default);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(routes_1.default);
app.use('*', (req, res, next) => {
    next((0, notFound_1.default)('Page not found'));
});
app.use((0, celebrate_1.errors)());
app.use(errorHandler_1.default);
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(connectionString, {});
            const db = mongoose_1.default.connection;
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            db.once('open', () => {
                console.log('Connected to MongoDB successfully!');
            });
            app.listen(portConfig, () => {
                console.log(`connected! on port ${portConfig}`);
            });
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    });
}
connect();
