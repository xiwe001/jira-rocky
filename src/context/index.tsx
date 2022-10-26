import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { BrowserRouter as Router } from "react-router-dom";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
