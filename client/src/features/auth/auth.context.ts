import { createContext } from "react";
import type { LoginInput, PublicUser, SignupInput } from "./auth.types";

export type AuthContextValue = {
  user: PublicUser | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
