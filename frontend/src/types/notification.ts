import type { UserBasic } from "./friendRequest";

export interface INotification {
    _id: string;
    sender: UserBasic;
    recipient: UserBasic;
    type: "friend-request" | "message";
    createdAt: string;
    updatedAt: string;
}