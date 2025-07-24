import type { LoginData, SignupData } from "../types/auth";
import type { IUserOnboarding } from "../types/user";
import { axiosInstance } from "./axios";

export const signup = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const login = async (logInData: LoginData) => {
  const response = await axiosInstance.post("/auth/login", logInData);
  return response.data;
};

export const logout = async()=>{
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error: any) {
    // If user is not authenticated (401), return null instead of throwing
    if (error.response?.status === 401) {
      return null;
    }
    // Re-throw other errors
    throw error;
  }
}

export const completeOnboarding = async (userData: IUserOnboarding) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export const getReccommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export const getOutGoingFriendsRequests = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export const sendFriendRequest = async (userId: string) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId:string) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
