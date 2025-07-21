import { Request, Response } from "express";
import User from "../modules/User";
import { IUser } from "../types/user.types";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream";


interface AuthenticatedRequest extends Request {
    user?: IUser;
}


export async function signup(req: Request, res: Response) {
    const { fullName, email, password } = req.body;

    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }


        const idx = Math.floor(Math.random() * 100) + 1
        const randomAvatar = `https://avatar-placeholder.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar,
        }) as IUser

         try{
             await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic
        })
        console.log("Stream user upserted successfully", newUser.fullName);   
         } catch (error) {
             console.error("Error upserting Stream user:", error);
         }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '7d'
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        res.status(201).json({
            success: true,
            user: newUser
        })

    } catch (err) {
        console.log("Error in signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function logout(req: Request, res: Response) {
    res.clearCookie("jwt")
    res.status(200).json({ success:true,message: "Logged out successfully" });
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (typeof user.comparePassword !== "function") {
            return res.status(500).json({ message: "Password comparison method not implemented" });
        }
        const isPasswordValid = await user.comparePassword(password);

        if( !isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '7d'
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        res.status(200).json({ success: true, user });

    } catch (err) {
        console.log("Error in login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function onboard(req: AuthenticatedRequest, res: Response) {
    try{
        const userId = req.user?._id;

        const {fullName, nativeLanguage, learningLanguage, bio,location} = req.body;
        if(!fullName || !nativeLanguage || !learningLanguage || !bio || !location) {
            return res.status(400).json({ message: "All fields are required" ,missingFields: [
                !fullName && "fullName",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && "learningLanguage",
                !bio && "bio",
                !location && "location"
            ].filter(Boolean) 
        
        });
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded: true,
        },{ new: true })

        if (!updatedUser) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error in onboarding:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

