import { createContext, useState, useEffect } from "react";

export const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios, loading }}>
      {children}
    </UsuariosContext.Provider>
  );
}
