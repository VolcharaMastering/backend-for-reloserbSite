import { celebrate, Joi } from 'celebrate';
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


const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});
const validMail = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    
  }),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validId),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUserId,
  validateUpdateUser,
};
