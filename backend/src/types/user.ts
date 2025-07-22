import { Request } from "express";
import mongoose, { Document } from "mongoose";

export interface IUserCreate {
    fullName: string;
    email: string;
    password: string;
    bio?: string;
    profilePic?: string;
    nativeLanguage?: string;
    learningLanguage?: string;
    isOnboarded?: boolean;
    friends?: mongoose.Types.ObjectId[];
}

export interface IUserResponse {
    _id: string;
    fullName: string;
    email: string;
    bio?: string;
    profilePic?: string;
    nativeLanguage?: string;
    learningLanguage?: string;
    isOnboarded?: boolean;
    friends?: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    bio?: string;
    profilePic?: string;
    nativeLanguage?: string;
    learningLanguage?: string;
    isOnboarded?: boolean;
    friends?: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword?(enteredPassword: string): Promise<boolean>;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}
