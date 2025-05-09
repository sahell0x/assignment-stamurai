import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../lib/api-client";
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
  USER_ROUTE,
} from "../utils/constant";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import userInfoAtom from "../store/userInfoAtom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  users:User[] | []
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUsers:any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useRecoilState(userInfoAtom);
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get(USER_ROUTE, {
          withCredentials: true,
        });



        if (response.status === 200) {
          const userData: User = response.data as User;

          setUser(userData);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const userData: User = response.data as User;
        setUser(userData);
        return true;
      }

      return false;
    } catch (error) {
      toast.error("Wrong email or password");
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await apiClient.post(
        REGISTER_ROUTE,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        const userData: User = response.data as User;
        setUser(userData);
      }

      return true;
    } catch (error: any) {
      if (error.status === 409) {
        toast.error("Emial is already in use.");
      } else {
        toast.error("Somthing wents wrong please try again.");
      }

      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(null);
        toast.success("Logout successfully.");
      }
    } catch {
      toast.error("Somthing wents wrong try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        users,
        setUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
