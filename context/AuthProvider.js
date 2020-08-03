import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import axiosBase from "../utils/axiosBase";
import Cookies from "js-cookie";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const Router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/check-auth`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${Cookies.get("tokenss")}`
      //   }
      // });

      await axiosBase
        .post("user/check-auth", null, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        })
        .then((response) => {
          if (response.data.user) {
            console.log(response.data.user);
            setIsAuthenticated(true);
            setIsLoading(false);
            setUser(response.data.user);
          } else {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsAuthenticated(false);
          setIsLoading(false);
          console.log(err.response);
        });
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
