export type FriendRequestStatus = "pending" | "accepted";

export const FRIEND_REQUEST_STATUS = {
  PENDING: "pending" as const,
  ACCEPTED: "accepted" as const,
} as const;

export interface UserBasic {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
}

export interface FriendRequest {
  _id: string;
  sender:  UserBasic; 
  recipient:  UserBasic; 
  status: FriendRequestStatus;
  createdAt: string;
  updatedAt: string;
}

