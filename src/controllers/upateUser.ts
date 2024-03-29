import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthError from "../errors/authError";
import ConflictError from "../errors/conflictError";
import NotFound from "../errors/notFound";
import IncorrectData from "../errors/requestError";
import ServerError from "../errors/serverError";
import User from "../models/User";
import { OK_CODE, CODE_CREATED } from "../states/states";

import { forFunction, UsersBody} from "./types";
import SupportRequests from "../models/SupportRequests";


const updateUser: forFunction = async (req, res, next) => {
    const {
        email,
        name,
        lastName,
        phoneNumber,
        tgLink,
        interestProjects,
        sendRequests,
        businessData,
      } = req.body;
      
      const requestBody = req.body as unknown as UsersBody;
      if (
        typeof requestBody !== "object" ||
        typeof requestBody.email !== "string" ||
        typeof requestBody.name !== "string" ||
        (requestBody.lastName !== undefined && typeof requestBody.lastName !== "string") ||
        (requestBody.phoneNumber !== undefined && typeof requestBody.phoneNumber !== "string") ||
        (requestBody.tgLink !== undefined && typeof requestBody.tgLink !== "string") ||
        (requestBody.interestProjects !== undefined && !Array.isArray(requestBody.interestProjects)) ||
        (requestBody.sendRequests !== undefined && !Array.isArray(requestBody.sendRequests)) ||
        (requestBody.businessData !== undefined && typeof requestBody.businessData !== "string")
      ) {
        next(
          IncorrectData(
            "The request body must be an object with email, password, name, optional lastName, phoneNumber, tgLink, optional interestProjects array, optional businessData"
          )
        );
        return;
      }
      
  User.findByIdAndUpdate(
    (req as any).user._id,
    { email,
        name,
        lastName,
        phoneNumber,
        tgLink,
        interestProjects,
        sendRequests,
        businessData
     },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(NotFound('No such user'));
        return;
      }
      res.send(user);
    })
    .catch((e) => {
      if (e.code === 11000) {
        next(ConflictError('User with this email already exists'));
        return;
      }
      if (e.name === 'ValidationError') {
        next(IncorrectData('Invalid data'));
        return;
      }
      next(ServerError('Some bugs on server'));
    });
};
export default updateUser;