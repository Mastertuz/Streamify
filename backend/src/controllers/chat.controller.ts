import { Response } from "express";
import { generateStreamToken } from "../lib/stream";
import { AuthenticatedRequest } from "../types/user";


export async function getStreamToken(req:AuthenticatedRequest, res:Response) {
    try {
        const token =  generateStreamToken(req.user?.id)

        res.status(200).json({token})


    } catch (error) {
        console.log("Error generating Stream token:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
