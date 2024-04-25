require("dotenv").config();
import bcrypt from "bcryptjs";
import AuthError from "../errors/authError";
import ServerError from "../errors/serverError";
import User from "../models/User";
import { OK_CODE } from "../states/states";

import { UsersBody, forFunction } from "./types";
import generateTokens from "../utils/genTokens";

const login: forFunction = async (req, res, next) => {
  const { email, roles, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      next(AuthError("Invalid login or password"));
      return;
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      next(AuthError("Invalid login or password"));
      return;
    }
    const { accessToken, refreshToken } = await generateTokens(user as unknown as UsersBody);
    res.status(OK_CODE).send({ data: user, accessToken, refreshToken });
  } catch (e) {
    console.log(e);
    next(ServerError("Some bugs on server"));
  }
};

export default login;

