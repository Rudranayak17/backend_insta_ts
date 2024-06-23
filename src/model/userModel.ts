import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types/types";


const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Please enter Your Name"],
        maxLength: [30, "Name must be 30 characters"],
        minLength: [3, "Name must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter Your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter Your Password"],
       
        select: false
    },
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: true,
    //     },
    //     url: {
    //         type: String,
    //         required: true,
    //     },
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordOTP: Number,
    resetPasswordOTPExpiry: Date,
}, { timestamps: true });

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function (this: IUser) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;