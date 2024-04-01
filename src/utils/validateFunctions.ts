import { Joi } from 'celebrate';
const { ObjectId } = require('mongoose').Types;

type ValidationType = (value: unknown, helpers: Joi.CustomHelpers<any>) => string | Joi.ErrorReport;

const validId: ValidationType = (value, helpers) => {
  if (typeof value !== 'string' || !ObjectId.isValid(value)) {
    return helpers.error('any.invalid') as Joi.ErrorReport;
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

export {ValidationType, validId, tgValidate};