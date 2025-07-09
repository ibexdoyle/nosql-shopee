import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCurrentUser,
  login as apiLogin,
  logout as apiLogout,
} from "../services/AuthService";

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        if (currentUser) {
          setUser(currentUser); // session hợp lệ
        } else {
          setUser(null); // session hết hạn
        }
      } catch (err) {
        console.error("Không thể kiểm tra phiên đăng nhập:", err.message);
        setUser(null);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = await apiLogin(email, password);
      setUser(loggedInUser);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const profile = await fetchCurrentUser();
      setUser(profile);
    } catch (err) {
      throw new Error(err.message || "Đăng nhập thất bại");
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Lỗi khi logout:", err.message);
    } finally {
      setUser(null);
    }
  };


  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};