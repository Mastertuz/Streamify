import mongoose, { Document } from "mongoose";

// Enum для статуса заявки в друзья
export enum FriendRequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted"
}

// Основной интерфейс для Friend Request
export interface IFriendRequest extends Document {
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
    status: FriendRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

// Тип для создания новой заявки в друзья
export interface IFriendRequestCreate {
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
    status?: FriendRequestStatus;
}

// Тип для ответа API с популированными пользователями
export interface IFriendRequestResponse {
    _id: string;
    sender: {
        _id: string;
        fullName: string;
        email: string;
        profilePic?: string;
    };
    recipient: {
        _id: string;
        fullName: string;
        email: string;
        profilePic?: string;
    };
    status: FriendRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

// Тип для обновления статуса заявки
export interface IFriendRequestUpdate {
    status: FriendRequestStatus;
}
