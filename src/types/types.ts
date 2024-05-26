import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar: {
      public_id: string;
      url: string;
    };
    createdAt: Date;
    role: string;
    resetPasswordOTP: number;
    resetPasswordOTPExpiry: Date;
    getJWTToken(): string;
  }
  
export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
