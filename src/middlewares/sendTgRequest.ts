import express, { Request, Response, NextFunction } from "express";
import { Telegraf, Context } from "telegraf";
import NotFound from "../errors/notFound";
import Project from "../models/Projects";

interface forFunction {
  (req: Request, res: Response, next: NextFunction): void;
}
interface RequestBody {
  projectId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessage: string;
  businessData: string;
}

const { FORM_TG_BOT_TOKEN, FORM_TG_CHANNAL } = process.env as {
  FORM_TG_BOT_TOKEN: string;
  FORM_TG_CHANNAL: string;
};
interface MyContext extends Context {
  myProp?: string;
  myOtherProp?: number;
}

const sendTg: forFunction = async (req, res, next) => {
  const {
    projectId,
    clientName,
    clientEmail,
    clientPhone,
    clientMessage,
    businessData,
  } = req.body;
  const projectRequest = await Project.findOne({ _id: projectId });

  if (!projectRequest) {
    next(NotFound("There is no requests for support"));
    return;
  }
  const tgText = `Запрос на поддержку по проекту ${projectRequest.projectName}.
    Порядковый номер запроса: ${projectRequest.projectCalls}\n
    Имя клиента: ${clientName}\n
    Email клиента: ${clientEmail}\n
    Телефон клиента: ${clientPhone && clientPhone}\n
    Текст обращения: ${clientMessage && clientMessage}\n
    Business Data: ${businessData && businessData}`;

  const bot = new Telegraf<MyContext>(FORM_TG_BOT_TOKEN);

  await bot.telegram.sendMessage(FORM_TG_CHANNAL, tgText);

  next();
};
export default sendTg;
