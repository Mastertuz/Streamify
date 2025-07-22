import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthenticatedRequest } from "../types/user";


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
        const user = await User.findById((decoded as jwt.JwtPayload).userId).select("-password");
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