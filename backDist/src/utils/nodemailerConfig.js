"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
const { FORM_FROM_EMAIL, FORM_FROM_EMAIL_PASSWORD } = process.env;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: FORM_FROM_EMAIL,
        pass: FORM_FROM_EMAIL_PASSWORD,
    },
    secure: true,
    requireTLS: true,
});
exports.default = transporter;
