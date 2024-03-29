import express, { Request, Response, NextFunction } from "express";

type ServerError = {
  message: string;
  code: number;
}

const errorHandler = (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const { code = 500, message } = err;

  res.status(code).send({
    message: code === 500 ? 'Произошла ошибка на сервере' : message,
  });

  next();

  next(err);
};

export default errorHandler;

