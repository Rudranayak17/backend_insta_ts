import express from "express";
import { validateData } from "../middleware/validationMiddleware.js";
import { userLoginSchema, userRegistrationSchema } from "../schemas/userSchemas.js";
import { loginUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/register', validateData(userRegistrationSchema), registerUser);
userRouter.post('/login', validateData(userLoginSchema), loginUser);




export default userRouter