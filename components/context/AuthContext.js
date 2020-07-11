import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";

//fetcher here is an axios instance
import fetcher from "../../lib/fetcher";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        fetcher.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await fetcher.get("users/me");
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const { data: token } = await fetcher.post("auth/login", { email, password });
    if (token) {
      console.log("Got token");
      Cookies.set("token", token, { expires: 60 });
      fetcher.defaults.headers.Authorization = `Bearer ${token.token}`;
      const { data: user } = await fetcher.get("users/me");
      setUser(user);
      console.log("Got user", user);
    }
  };

  const logout = (email, password) => {
    Cookies.remove("token");
    setUser(null);
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
