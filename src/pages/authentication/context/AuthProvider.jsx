import { useEffect, useMemo, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import api from "../../../lib/axios";
import { toast } from "react-toastify";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const persistAuth = useCallback((data) => {
    const { token } = data || {};
    if (token) localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const signup = useCallback(
    async (payload) => {
      try {
        const res = await api.post("/auth/signup", payload);
        const data = res.data?.data || res.data?.user || res.data;
        persistAuth(data);
        return data;
      } catch (e) {
        toast.error(e.response?.data?.message || "Signup failed");
      }
    },
    [persistAuth]
  );

  const login = useCallback(
    async (payload) => {
      try {
        const res = await api.post("/auth/login", payload);
        const data = res.data?.data || res.data?.user || res.data;
        persistAuth(data);
        return data;
      } catch (e) {
        toast.error(e.response?.data?.message || "Login failed");
      }
    },
    [persistAuth]
  );

  const forgotPassword = useCallback(async ({ email }) => {
    try {
      await api.post("/auth/forgotPassword", { email });
    } catch (e) {
      toast.error(e.response?.data?.message || "Forgot password failed");
    }
  }, []);

  const resetPassword = useCallback(async (token, { password }) => {
    try {
      await api.patch(`/auth/resetPassword/${token}`, { password });
    } catch (e) {
      toast.error(e.response?.data?.message || "Reset Password failed");
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      forgotPassword,
      resetPassword,
      logout,
    }),
    [user, login, signup, forgotPassword, resetPassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
