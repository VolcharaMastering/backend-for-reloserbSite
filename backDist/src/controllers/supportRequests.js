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
exports.sendMail = exports.addSupportRequests = exports.getSupportRequests = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notFound_1 = __importDefault(require("../errors/notFound"));
const requestError_1 = __importDefault(require("../errors/requestError"));
const serverError_1 = __importDefault(require("../errors/serverError"));
const SupportRequests_1 = __importDefault(require("../models/SupportRequests"));
const states_1 = require("../states/states");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailerConfig"));
const { FORM_FROM_EMAIL, FORM_TO_EMAIL } = process.env;
const getSupportRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supportRequests = yield SupportRequests_1.default.find({});
        if (!supportRequests) {
            next((0, notFound_1.default)("There is no requests for support"));
            return;
        }
        res.status(states_1.OK_CODE).send(supportRequests);
    }
    catch (e) {
        next((0, serverError_1.default)("Some bugs on server"));
    }
});
exports.getSupportRequests = getSupportRequests;
const addSupportRequests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    console.log(requestBody);
    if (typeof requestBody !== "object" ||
        typeof requestBody.projectId !== "string" ||
        typeof requestBody.clientName !== "string" ||
        typeof requestBody.clientEmail !== "string" ||
        typeof requestBody.clientPhone !== "string" ||
        typeof requestBody.clientMessge !== "string" ||
        typeof requestBody.buisnessData !== "string") {
        next((0, requestError_1.default)("The request body must be an object with supportRequestName, supportRequestType and supportRequestCalls properties."));
        return;
    }
    try {
        const supportRequest = yield new SupportRequests_1.default(requestBody).save();
        res.status(states_1.CODE_CREATED).send({ data: supportRequest });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            next((0, requestError_1.default)("Validation error"));
            return;
        }
        //   else if (error.code === 11000) {
        //     next(ConflictError('The supportRequest with the same name is created.'));
        //     return;
        //   }
        else {
            next((0, serverError_1.default)("Some bugs on server"));
            return;
        }
    }
});
exports.addSupportRequests = addSupportRequests;
const sendMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, clientName, clientEmail, clientPhone, clientMessage, businessData, } = req.body;
    console.log("sendMail", projectId, clientName, clientEmail, clientPhone, clientMessage, businessData);
    const mailOptions = {
        from: FORM_FROM_EMAIL,
        to: FORM_TO_EMAIL,
        subject: `Запрос на поддержку по проекту ${projectId}`,
        text: `Имя клиента: ${clientName}\nEmail клиента: ${clientEmail}\nТелефон клиента: ${clientPhone && clientPhone}\nТекст обращения: ${clientMessage && clientMessage}\nBusiness Data: ${businessData && businessData}`,
    };
    try {
        yield nodemailerConfig_1.default.sendMail(mailOptions);
        res.status(states_1.CODE_CREATED).send({ message: "Feedback email sent successfully" });
    }
    catch (error) {
        console.log(error);
        next((0, serverError_1.default)("Failed to send feedback email"));
        return;
    }
});
exports.sendMail = sendMail;
