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

const createUser: forFunction = async (req, res, next) => {
  const {
    email,
    password,
    name,
    lastName,
    phoneNumber,
    tgLink,
    interestProjects,
    businessData,
  } = req.body;
  
  const requestBody = req.body as unknown as UsersBody;
  if (
    typeof requestBody !== "object" ||
    typeof requestBody.email !== "string" ||
    typeof requestBody.password !== "string" ||
    typeof requestBody.name !== "string" ||
    (requestBody.lastName !== undefined && typeof requestBody.lastName !== "string") ||
    (requestBody.phoneNumber !== undefined && typeof requestBody.phoneNumber !== "string") ||
    (requestBody.tgLink !== undefined && typeof requestBody.tgLink !== "string") ||
    (requestBody.interestProjects !== undefined && !Array.isArray(requestBody.interestProjects)) ||
    (requestBody.businessData !== undefined && typeof requestBody.businessData !== "string")
  ) {
    next(
      IncorrectData(
        "The request body must be an object with email, password, name, optional lastName, phoneNumber, tgLink, optional interestProjects array, optional businessData"
      )
    );
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sendRequests = await SupportRequests.find(
      { clientEmail: email },
      { projection: { _id: 1 } },
    ).then((el) => el.map((el) => el._id.toString()));
    const user = await new User({
      email,
      password: hashedPassword,
      name,
      lastName,
      phoneNumber,
      tgLink,
      interestProjects,
      sendRequests,
      businessData,
    }).save();
    res.status(CODE_CREATED).send({ data: user });
  } catch (e: Error | any) {
    if (e.code === 11000) {
      next(ConflictError('Email or phone or tg already exists'));
      return;
    }
    if (e.name === 'ValidatorError') {
      next(IncorrectData('Validation error'));
      return;
    }
    console.log("cathed error", e);

    next(ServerError("Some bugs on server"));
  }
};


export default createUser;
