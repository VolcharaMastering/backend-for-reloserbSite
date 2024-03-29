import { celebrate, Joi } from 'celebrate';
import { validId, tgValidate } from '../utils/validateFunctions';
const phoneJoi = Joi.extend(require('joi-phone-number'));

export const validateCreateRequest = celebrate({
  body: Joi.object().keys({
    projectId: Joi.string().required().custom(validId),
    clientName: Joi.string().required().min(2).max(120),
    clientEmail: Joi.string().required().email(),
    clientPhone: phoneJoi.string().phoneNumber(),
    clientTg:Joi.string().min(3).custom(tgValidate),
    clientMessage: Joi.string().required().min(10).max(500),
    businessData:Joi.string()
  }),
});

export default validateCreateRequest;
