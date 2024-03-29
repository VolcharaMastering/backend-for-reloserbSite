import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthError from "../errors/authError";
import ConflictError from "../errors/conflictError";
import NotFound from "../errors/notFound";
import IncorrectData from "../errors/requestError";
import ServerError from "../errors/serverError";
import User from "../models/User";
import { OK_CODE, CODE_CREATED } from "../states/states";

import { forFunction, UsersBody } from "./types";

const getUsers: forFunction = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      next(NotFound('There is no users'));
      return;
    }
    res.status(OK_CODE).send(users);
  } catch (e) {
    next(ServerError('Some bugs on server'));
  }
};
 export default getUsers;