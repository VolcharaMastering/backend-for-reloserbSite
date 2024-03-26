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
exports.addProjects = exports.getProjects = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notFound_1 = __importDefault(require("../errors/notFound"));
const requestError_1 = __importDefault(require("../errors/requestError"));
const serverError_1 = __importDefault(require("../errors/serverError"));
const Projects_1 = __importDefault(require("../models/Projects"));
const states_1 = require("../states/states");
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Projects_1.default.find({});
        if (!projects) {
            next((0, notFound_1.default)('There is no users'));
            return;
        }
        res.status(states_1.OK_CODE).send(projects);
    }
    catch (e) {
        next((0, serverError_1.default)('Some bugs on server'));
    }
});
exports.getProjects = getProjects;
const addProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    if (typeof requestBody !== 'object' ||
        typeof requestBody.projectName !== 'string' ||
        typeof requestBody.projectType !== 'string' ||
        typeof requestBody.projectCalls !== 'number') {
        next((0, requestError_1.default)('The request body must be an object with projectName, projectType and projectCalls properties.'));
        return;
    }
    try {
        const project = yield new Projects_1.default(requestBody).save();
        res.status(states_1.CODE_CREATED).send({ data: project });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            next((0, requestError_1.default)('Validation error'));
            return;
        }
        //   else if (error.code === 11000) {
        //     next(ConflictError('The project with the same name is created.'));
        //     return;
        //   } 
        else {
            next((0, serverError_1.default)('Some bugs on server'));
            return;
        }
    }
    ;
});
exports.addProjects = addProjects;
