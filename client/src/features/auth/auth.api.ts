import { api } from "../../lib/api";
import type { LoginInput, PublicUser, SignupInput } from "./auth.types";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export async function loginRequest(input: LoginInput) {
  const { data } = await api.post<ApiResponse<PublicUser>>("/auth/login", input);
  return data.data;
}

export async function signupRequest(input: SignupInput) {
  const { data } = await api.post<ApiResponse<PublicUser>>("/auth/signup", input);
  return data.data;
}

export async function getMeRequest() {
  const { data } = await api.get<ApiResponse<PublicUser>>("/auth/me");
  return data.data;
}

export async function logoutRequest() {
  await api.post("/auth/logout");
}
