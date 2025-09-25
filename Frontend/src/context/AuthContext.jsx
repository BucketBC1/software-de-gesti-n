import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Al montar el context, revisa si hay token guardado
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Función para iniciar sesión (guarda token)
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    
  };

  // Función para cerrar sesión (elimina token)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el context fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
