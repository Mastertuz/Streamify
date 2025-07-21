import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/User";
import { IUser } from "../types/user.types";

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const protectRoute = async(req:AuthenticatedRequest,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
        const user = await User.findById((decoded as any).userId);
        if(!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user=user
        next();
    } catch (err) {
        console.error("Error in protectRoute middleware:", err);
        res.status(401).json({ message: "Internal Server Error" });
    }
}