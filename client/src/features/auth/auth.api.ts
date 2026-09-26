import { api } from "../../lib/api";
import type { LoginInput, PublicUser, SignupInput } from "./auth.types";

export async function loginRequest(input: LoginInput) {
  const response = await api.post("/auth/login", input);
  const body = response.data as { data: PublicUser };
  return body.data;
}

export async function signupRequest(input: SignupInput) {
  const response = await api.post("/auth/signup", input);
  const body = response.data as { data: PublicUser };
  return body.data;
}

export async function getMeRequest() {
  const response = await api.get("/auth/me");
  const body = response.data as { data: PublicUser };
  return body.data;
}

export async function logoutRequest() {
  await api.post("/auth/logout");
}
