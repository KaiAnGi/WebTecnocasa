// hooks/useDeleteAccount.js
import { useState, useCallback } from 'react';
import { deleteSelf } from '../componentes/servicios/clienteServices';

export function useDeleteAccount({ logout, navigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const confirmAndDelete = useCallback(async (captchaToken) => {
    setLoading(true);
    setError('');
    try {
      await deleteSelf({ captchaToken });              // DELETE en backend (ver sección backend)
    } catch (e) {
      setError(e.message || 'No se pudo eliminar la cuenta.');
      throw e;
    } finally {
      // Pase lo que pase, intenta cerrar sesión y saca al usuario de zonas protegidas
      try { await logout?.(); } catch {}
      navigate('/', { replace: true });               // evita quedarse en /perfil y no deja "volver" a la página protegida
      setLoading(false);
    }
  }, [logout, navigate]);

  return { loading, error, setError, confirmAndDelete };
}
