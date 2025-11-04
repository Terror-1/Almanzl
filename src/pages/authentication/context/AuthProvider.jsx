import { useEffect, useMemo, useState, useCallback } from "react";
import api from "../../../lib/axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

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
      const body = {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
      };
      try {
        const res = await api.post("/auth/signup", body);
        const data = res.data?.data || res.data?.user || res.data;
        persistAuth(data);
        return true;
      } catch (e) {
        toast.error(e.response?.data?.message || "Signup failed");
        return false;
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
        return false;
      }
    },
    [persistAuth]
  );

  const forgotPassword = useCallback(async ({ email }) => {
    try {
      await api.post("/auth/forgotPassword", { email });
      return true;
    } catch (e) {
      toast.error(e.response?.data?.message || "Forgot password failed");
      return false;
    }
  }, []);

  const resetPassword = useCallback(async (token, { password }) => {
    try {
      await api.patch(`/auth/resetPassword/${token}`, { password });
      return true;
    } catch (e) {
      toast.error(e.response?.data?.message || "Reset Password failed");
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const updateAddress = useCallback(
    (newAddress) => {
      if (!user) return;

      const updatedUser = { ...user, address: newAddress };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      forgotPassword,
      resetPassword,
      logout,
      updateAddress,
    }),
    [user, login, signup, forgotPassword, resetPassword, logout, updateAddress]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
