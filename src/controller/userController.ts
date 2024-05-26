import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/utility-class.js";
import { IUser } from "../types/types.js";
import sendToken from "../utils/sendToken.js";
import bcrypt from 'bcrypt';


export const registerUser = TryCatch(async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("email is already exits", 401))
    }
    user = await User.create({
        email, password, username
    })
    sendToken(user, 201, res);
})
export const loginUser = TryCatch(async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;


    let user = await User.findOne({ $or: [{ email: email }, { username: email }] }).select("+password");


    if (!user) {
        return next(new ErrorHandler("email or password is invalid", 401));
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
        return next(new ErrorHandler("email or password is invalid", 401));
    }


    sendToken(user, 200, res);
});