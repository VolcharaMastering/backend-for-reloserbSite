import { celebrate, Joi } from 'celebrate';
const { ObjectId } = require('mongoose').Types;
const phoneJoi = Joi.extend(require('joi-phone-number'));

type ValidationType = (value: unknown, helpers: Joi.CustomHelpers<any>) => string | Joi.ErrorReport;

const validId: ValidationType = (value, helpers) => {
  if (typeof value !== 'string' || !ObjectId.isValid(value)) {
    return helpers.error('any.invalid') as Joi.ErrorReport;
  }
  return value as string;
};


const textFields: ValidationType = (value, helpers) => {
  const regExp = /^([\w\s-]*(?<!\.js|\.exe|\.bat|\.dll|\.msi|\.reg|\.pif|\.lnk|\.scr|\.cmd|\.com|\.vbs|\.jar|\.class|\.sh|\.pl|\.py|\.rb|\.ps1|\.php|\.htaccess|\.htpasswd|\.yml|<|>|\|&;\(\)\`\$=))+$/i;
  if (typeof value !== 'string' || regExp.test(value)) {
    return helpers.error('any.invalid');
  }
  return value as string;
};
const tgValidate: ValidationType = (value, helpers) => {
  const telegramRegex = /^(?:https?:\/\/)?t\.me\/[_a-zA-Z0-9]+|@[_a-zA-Z0-9]+$/;
  if (typeof value === 'string' && /^@[_a-zA-Z0-9]+$/.test(value)) {
      value = `https://t.me/${value.slice(1)}`;
  }
  if (typeof value !== 'string' || !telegramRegex.test(value)) {
      return helpers.error('Invalid Telegram link or username format');
  }
  return value;
};



export const validateCreateRequest = celebrate({
  body: Joi.object().keys({
    projectId: Joi.string().required().custom(validId),
    clientName: Joi.string().required().min(2).max(120),
    clientEmail: Joi.string().required().email(),
    clientPhone: phoneJoi.string().phoneNumber(),
    clientTg:Joi.string().min(8).custom(tgValidate),
    clientMessage: Joi.string().required().min(10).max(500),
    businessData:Joi.string()
  }),
});

module.exports = {
  validateCreateRequest,
};
