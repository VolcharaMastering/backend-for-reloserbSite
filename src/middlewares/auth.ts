import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import AuthError from '../errors/authError';

interface forFunction {
    (req:  Request<any, any, any, any, Record<string, any>>, res: Response, next: NextFunction): void;
  }
const auth: forFunction = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(AuthError('Auth is needed'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY_PROD as string, { 
      algorithms: ["HS256"],
    });
  } catch (e) {
    next(AuthError('Invalid token'));
    return;
  }
  (req as any).user = payload;
  next();
};

export default auth;