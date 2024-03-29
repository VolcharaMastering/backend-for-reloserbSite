require('dotenv').config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthError from "../errors/authError";
import ServerError from "../errors/serverError";
import User from "../models/User";
import { OK_CODE, CODE_CREATED } from "../states/states";

import { forFunction, } from "./types";

const login: forFunction = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(AuthError('Invalid login or password'));
      return;
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      next(AuthError('Invalid login or password'));
      return;
    }
    const token = jwt.sign({
      _id: user._id,
    }, process.env.SECRET_KEY_PROD as string, { 
      algorithm: "HS256",
    });
    res.status(OK_CODE).send({ data: user, token });
  } catch (e) {
    console.log(e);
    next(ServerError('Some bugs on server'));
  }
};

export default login;
