"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const { ObjectId } = require('mongoose').Types;
const validId = (value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};
const validLink = (value, helpers) => {
    if (validUrl(value)) {
        return value;
    }
    return helpers.error('any.invalid');
};
const textFields = (value, helpers) => {
    const regExp = /^([\w\s-]*(?<!\.js|\.exe|\.bat|\.dll|\.msi|\.reg|\.pif|\.lnk|\.scr|\.cmd|\.com|\.vbs|\.jar|\.class|\.sh|\.pl|\.py|\.rb|\.ps1|\.php|\.htaccess|\.htpasswd|\.yml|<|>|\|&;\(\)\`\$=))+$/i;
    if (!regExp.test(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};
const validateCreateUser = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().required().email(),
        password: celebrate_1.Joi.string().required().min(8),
        name: celebrate_1.Joi.string().required().min(2).max(30),
    }),
});
const validMail = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().email().required(),
    }),
});
const validateLogin = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    }),
});
const validateUserId = (0, celebrate_1.celebrate)({
    params: celebrate_1.Joi.object().keys({
        userId: celebrate_1.Joi.string().required().custom(validId),
    }),
});
const validateUpdateUser = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().email().required(),
        name: celebrate_1.Joi.string().required().min(2).max(30),
    }),
});
module.exports = {
    validateLogin,
    validateCreateUser,
    validateUserId,
    validateUpdateUser,
};
