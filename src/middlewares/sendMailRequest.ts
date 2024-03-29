import { Request, Response, NextFunction } from "express";
import NotFound from "../errors/notFound";
import ServerError from "../errors/serverError";
import Project from "../models/Projects";
import transporter from "../utils/nodemailerConfig";

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

  const { FORM_FROM_EMAIL, FORM_TO_EMAIL } = process.env as {
    FORM_FROM_EMAIL: string;
    FORM_TO_EMAIL: string;
  };


const sendMail: forFunction = async (req, res, next) => {
    const {
      projectId,
      clientName,
      clientEmail,
      clientPhone,
      clientMessage,
      businessData,
    } = req.body;
    const projectRequest = await Project.findOneAndUpdate(
      { _id: projectId },
      { $inc: { projectCalls: 1 } },
      { new: true }
    );
  
    if (!projectRequest) {
      next(NotFound("There is no requests for support"));
      return;
    }
    const mailOptions = {
      from: FORM_FROM_EMAIL,
      to: FORM_TO_EMAIL,
      subject: `Запрос на поддержку по проекту ${projectRequest.projectName}. Порядковый номер запроса: ${projectRequest.projectCalls}`,
      text: `Имя клиента: ${clientName}\nEmail клиента: ${clientEmail}\nТелефон клиента: ${clientPhone && clientPhone}\nТекст обращения: ${clientMessage && clientMessage}\nBusiness Data: ${businessData && businessData}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    //   res
    //     .send({ message: "Feedback email sent successfully" });
        next();
    } catch (error) {
      console.log(error);
      next(ServerError("Failed to send feedback email"));
      return;
    }
  };
  export default sendMail;