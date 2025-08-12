import React, { createContext, useState, useEffect } from "react";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UsuariosContext.Provider value={{ user, login, logout }}>
      {children}
    </UsuariosContext.Provider>
  );
};
