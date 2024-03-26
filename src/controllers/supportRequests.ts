import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import NotFound from "../errors/notFound";
import IncorrectData from "../errors/requestError";
import ServerError from "../errors/serverError";
import SupportRequest from "../models/SupportRequests";
import { OK_CODE, CODE_CREATED } from "../states/states";
import transporter from "../utils/nodemailerConfig";

interface forFunction {
  (req: Request, res: Response, next: NextFunction): void;
}
interface RequestBody {
  projectId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessge: string;
  buisnessData: string;
}

const { FORM_FROM_EMAIL, FORM_TO_EMAIL } = process.env as {
  FORM_FROM_EMAIL: string;
  FORM_TO_EMAIL: string;
};

export const getSupportRequests: forFunction = async (req, res, next) => {
  try {
    const supportRequests = await SupportRequest.find({});
    if (!supportRequests) {
      next(NotFound("There is no requests for support"));
      return;
    }
    res.status(OK_CODE).send(supportRequests);
  } catch (e) {
    next(ServerError("Some bugs on server"));
  }
};

export const addSupportRequests: forFunction = async (req, res, next) => {
  const requestBody = req.body as unknown as RequestBody;
  console.log(requestBody);
  if (
    typeof requestBody !== "object" ||
    typeof requestBody.projectId !== "string" ||
    typeof requestBody.clientName !== "string" ||
    typeof requestBody.clientEmail !== "string" ||
    typeof requestBody.clientPhone !== "string" ||
    typeof requestBody.clientMessge !== "string" ||
    typeof requestBody.buisnessData !== "string"
  ) {
    next(
      IncorrectData(
        "The request body must be an object with supportRequestName, supportRequestType and supportRequestCalls properties."
      )
    );
    return;
  }
  try {    
    const supportRequest = await new SupportRequest(requestBody).save();
    res.status(CODE_CREATED).send({ data: supportRequest });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(IncorrectData("Validation error"));
      return;
    }
    //   else if (error.code === 11000) {
    //     next(ConflictError('The supportRequest with the same name is created.'));
    //     return;
    //   }
    else {
      next(ServerError("Some bugs on server"));
      return;
    }
  }
};
export const sendMail: forFunction = async (req, res, next) => {
  const {
    projectId,
    clientName,
    clientEmail,
    clientPhone,
    clientMessage,
    businessData,
  } = req.body;
console.log("sendMail", projectId, clientName, clientEmail, clientPhone, clientMessage, businessData);

  const mailOptions = {
    from: FORM_FROM_EMAIL,
    to: FORM_TO_EMAIL,
    subject: `Запрос на поддержку по проекту ${projectId}`,
    text: `Имя клиента: ${clientName}\nEmail клиента: ${clientEmail}\nТелефон клиента: ${clientPhone && clientPhone}\nТекст обращения: ${clientMessage && clientMessage}\nBusiness Data: ${businessData && businessData}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(CODE_CREATED).send({ message: "Feedback email sent successfully" });
  } catch (error) {
    console.log(error);
    next(ServerError("Failed to send feedback email"));
    return;
  }
};
