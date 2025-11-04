import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  signup: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  logout: () => {},
});
