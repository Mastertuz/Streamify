import type { LoginData, SignupData } from "../types/auth";
import type { IUserOnboarding } from "../types/user";
import { axiosInstance } from "./axios";

export const signup = async (data: SignupData) => {
  const response = await axiosInstance.post("auth/signup", data);
  return response.data;
};

export const login = async (logInData: LoginData) => {
  const response = await axiosInstance.post("auth/login", logInData);
  return response.data;
};

export const logout = async()=>{
  const response = await axiosInstance.post("auth/logout");
  return response.data;
}

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
}

export const completeOnboarding = async (userData: IUserOnboarding) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};


