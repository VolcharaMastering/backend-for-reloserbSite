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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authError_1 = __importDefault(require("../errors/authError"));
const conflictError_1 = __importDefault(require("../errors/conflictError"));
const notFound_1 = __importDefault(require("../errors/notFound"));
const requestError_1 = __importDefault(require("../errors/requestError"));
const serverError_1 = __importDefault(require("../errors/serverError"));
const User_1 = __importDefault(require("../models/User"));
const states_1 = require("../states/states");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        if (!users) {
            next(new notFound_1.default('There is no users'));
            return;
        }
        res.status(states_1.OK_CODE).send(users);
    }
    catch (e) {
        next(new serverError_1.default('Some bugs on server'));
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email }).select('+password');
        if (!user) {
            next(new authError_1.default('Invalid login or password'));
            return;
        }
        const validUser = yield bcryptjs_1.default.compare(password, user.password);
        if (!validUser) {
            next(new authError_1.default('Invalid login or password'));
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
        res.status(states_1.OK_CODE).send({ data: user, token });
    }
    catch (e) {
        next(new serverError_1.default('Some bugs on server'));
    }
});
const aboutMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const myId = req.user._id;
    try {
        const me = yield User_1.default.findById(myId);
        if (!me) {
            next(new notFound_1.default('No such user'));
            return;
        }
        res.status(states_1.OK_CODE).send(me);
    }
    catch (e) {
        next(new serverError_1.default('Some bugs on server'));
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield new User_1.default({
            email, password: hashedPassword, name,
        }).save();
        res.status(states_1.CODE_CREATED).send({ data: user });
    }
    catch (e) {
        if (e.code === 11000) {
            next(new conflictError_1.default('User with this email already exists'));
            return;
        }
        if (e.name === 'ValidatorError') {
            next(new requestError_1.default('Validation error'));
            return;
        }
        next(new serverError_1.default('Some bugs on server'));
    }
});
const updateUser = (req, res, next) => {
    const { email, name } = req.body;
    User_1.default.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
        .then((user) => {
        if (!user) {
            next(new notFound_1.default('No such user'));
            return;
        }
        res.send(user);
    })
        .catch((e) => {
        if (e.code === 11000) {
            next(new conflictError_1.default('User with this email already exists'));
            return;
        }
        if (e.name === 'ValidationError') {
            next(new requestError_1.default('Invalid data'));
            return;
        }
        next(new serverError_1.default('Some bugs on server'));
    });
};
module.exports = {
    getUsers,
    login,
    aboutMe,
    createUser,
    updateUser,
};
