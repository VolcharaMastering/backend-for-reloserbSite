import jwt, {
  Secret,
  JwtPayload,
  VerifyOptions,
} from "jsonwebtoken";
import { OK_CODE } from "../states/states";
import UserToken from "../models/UserToken";
import { forFunction } from "./types";
import AuthError from "../errors/authError";
import ServerError from "../errors/serverError";

const verifyRefreshToken: forFunction = async (req, res, next) => {
  const { refreshToken } = req.body;
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as Secret;

  if (!refreshToken) {
    next(AuthError("Refresh token is required"));
    return;
  }

  try {
    const dbToken = await UserToken.findOne({ token: refreshToken });
    if (!dbToken) {
      next(AuthError("Invalid token"));
      return;
    }

    const tokenDetails = jwt.verify(refreshToken, privateKey, {
      algorithms: ["HS256"],
    } as VerifyOptions) as JwtPayload;

    res.status(OK_CODE).send({
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    });
  } catch (e) {
    console.error(e);
    next(ServerError("Some bugs on server"));
  }
};

export default verifyRefreshToken;
