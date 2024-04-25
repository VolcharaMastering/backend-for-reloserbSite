import NotFound from "../errors/notFound";
import ServerError from "../errors/serverError";
import User from "../models/User";
import { OK_CODE, CODE_CREATED } from "../states/states";

import { forFunction } from "./types";


const aboutUser: forFunction = async (req, res, next) => {
  const myId = (req as any).user._id;
  try {
    const me = await User.findById(myId);
    if (!me) {
      next(NotFound('No such user'));
      return;
    }
    res.status(OK_CODE).send(me);
  } catch (e) {
    next(ServerError('Some bugs on server'));
  }
};  
export default aboutUser;
