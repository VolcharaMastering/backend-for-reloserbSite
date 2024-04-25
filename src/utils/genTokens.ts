import jwt, { Secret } from "jsonwebtoken";
import UserToken from "../models/UserToken";
import { UsersBody } from "./types";

/**
 * Generates access and refresh tokens for a given user.
 * Also saves the refresh token to the database.
 * @param user The user to generate tokens for
 * @returns An object containing the access and refresh tokens
 */
const generateTokens = async (user: UsersBody) => {
  try {
    const payload = { _id: user._id, roles: user.userRole };
    const accessToken = await jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret,
      { algorithm: "HS256", expiresIn: "14m" }
    );
    const refreshToken = await jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY as Secret,
      { algorithm: "HS256", expiresIn: "30d" }
    );

    const existingUserToken = await UserToken.findOne({ userId: user._id });
    if (existingUserToken) {
      await UserToken.findOneAndDelete({ userId: user._id });
    }

    const userToken = new UserToken({
      userId: user._id,
      token: refreshToken,
    });
    await userToken.save();

    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export default generateTokens;

