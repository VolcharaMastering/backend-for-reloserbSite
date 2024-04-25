import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
export interface forFunction {
    (req: Request, res: Response, next: NextFunction): void;
  }
 export interface RequestBody {
    projectId: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    clientMessage?: string;
    businessData?: string;
  }

export interface ProjectBody {
    projectName: string;
    projectType: string;
    projectCalls: number;
  }

  export interface UsersBody {
    _id: Document["_id"];
    email: string;
    password: string;
    name: string;
    userRole: "user" | "manager" | "owner";
    lastName?: string;
    phoneNumber?: string;
    tgLink?: string;
    interestProjects?: string[]
    sendRequests?: string[];
    businessData?: string;
  }