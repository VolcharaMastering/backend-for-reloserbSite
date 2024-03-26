"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateRequest = void 0;
const celebrate_1 = require("celebrate");
const { ObjectId } = require('mongoose').Types;
const phoneJoi = celebrate_1.Joi.extend(require('joi-phone-number'));
const validId = (value, helpers) => {
    if (typeof value !== 'string' || !ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};
const textFields = (value, helpers) => {
    const regExp = /^([\w\s-]*(?<!\.js|\.exe|\.bat|\.dll|\.msi|\.reg|\.pif|\.lnk|\.scr|\.cmd|\.com|\.vbs|\.jar|\.class|\.sh|\.pl|\.py|\.rb|\.ps1|\.php|\.htaccess|\.htpasswd|\.yml|<|>|\|&;\(\)\`\$=))+$/i;
    if (typeof value !== 'string' || regExp.test(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};
const tgValidate = (value, helpers) => {
    const telegramRegex = /^(?:https?:\/\/)?t\.me\/[_a-zA-Z0-9]+|@[_a-zA-Z0-9]+$/;
    if (typeof value === 'string' && /^@[_a-zA-Z0-9]+$/.test(value)) {
        value = `https://t.me/${value.slice(1)}`;
    }
    if (typeof value !== 'string' || !telegramRegex.test(value)) {
        return helpers.error('Invalid Telegram link or username format');
    }
    return value;
};
exports.validateCreateRequest = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        projectId: celebrate_1.Joi.string().required().custom(validId),
        clientName: celebrate_1.Joi.string().required().min(2).max(120),
        clientEmail: celebrate_1.Joi.string().required().email(),
        clientPhone: phoneJoi.string().phoneNumber(),
        clientTg: celebrate_1.Joi.string().min(8).custom(tgValidate),
        clientMessge: celebrate_1.Joi.string().required().min(10).max(500),
        buisnessData: celebrate_1.Joi.string()
    }),
});
module.exports = {
    validateCreateRequest: exports.validateCreateRequest,
};
