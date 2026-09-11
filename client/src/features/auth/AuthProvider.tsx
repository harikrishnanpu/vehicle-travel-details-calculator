import { useEffect, useState, type ReactNode } from "react";
import {
  getMeRequest,
  loginRequest,
  logoutRequest,
  signupRequest,
} from "./auth.api";
import { AuthContext } from "./auth.context";
import type { LoginInput, PublicUser, SignupInput } from "./auth.types";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const currentUser = await getMeRequest();

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(input: LoginInput) {
    const currentUser = await loginRequest(input);
    setUser(currentUser);
  }

  async function signup(input: SignupInput) {
    const currentUser = await signupRequest(input);
    setUser(currentUser);
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
