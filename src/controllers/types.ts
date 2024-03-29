import { Request, Response, NextFunction } from "express";
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
    email: string;
    password: string;
    name: string;
    lastName?: string;
    phoneNumber?: string;
    tgLink?: string;
    interestProjects?: string[]
    sendRequests?: string[];
    businessData?: string;
  }