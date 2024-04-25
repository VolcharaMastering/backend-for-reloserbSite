import NotFound from "../errors/notFound";
import ServerError from "../errors/serverError";
import User from "../models/User";
import { OK_CODE } from "../states/states";

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