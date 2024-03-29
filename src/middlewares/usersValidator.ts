import { celebrate, Joi } from "celebrate";
import { validId, tgValidate } from "../utils/validateFunctions";
const phoneJoi = Joi.extend(require("joi-phone-number"));

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().max(120),
    lastName: Joi.string().required().max(150),
    phoneNumber: phoneJoi.string().phoneNumber(),
    tgLink: Joi.string().min(3).custom(tgValidate),
    interestProjects: Joi.array().items(Joi.string().custom(validId)),
    sendRequests: Joi.array().items(Joi.string().custom(validId)),
    businessData: Joi.string(),
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

export {
  validateLogin,
  validateCreateUser,
  validateUserId,
  validateUpdateUser,
};
