// useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarAuth = async () => {
      try {
        // Verificar si hay sesión activa
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (authToken && userData) {
          setUsuario(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error verificando auth:', error);
      } finally {
        setCargando(false);
      }
    };

    verificarAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUsuario(null);
  };

  return { usuario, cargando, logout, setUsuario };
};
