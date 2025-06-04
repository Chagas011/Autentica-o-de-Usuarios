"use client";

import { User } from "@/entites/User";
import { createContext } from "react";

interface IAuthContextValue {
  user: User;
}

export const AuthContext = createContext({} as IAuthContextValue);

interface IAuthProviderProps {
  children: React.ReactNode;
  user: User;
}
export function AuthProvider({ children, user }: IAuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
