import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as doLogout, login as doLogin } from "../services/AuthService";

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await doLogin(email, password); 
      setUser(res); 
      localStorage.setItem("user", JSON.stringify(res));
    } catch (err) {
      throw new Error(err.message || "Đăng nhập thất bại");
    }
  };

  const logout = () => {
    doLogout(); 
    setUser(null);
    localStorage.removeItem("user");
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